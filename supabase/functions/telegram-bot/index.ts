import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    text?: string;
  };
  callback_query?: {
    id: string;
    from: {
      id: number;
      first_name: string;
      username?: string;
    };
    data: string;
  };
}

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") || "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
);

async function trackUser(telegramUser: {
  id: number;
  first_name: string;
  username?: string;
}) {
  try {
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("telegram_user_id", telegramUser.id)
      .maybeSingle();

    if (existingUser) {
      await supabase
        .from("users")
        .update({
          interaction_count: (existingUser.interaction_count || 0) + 1,
          last_interaction_at: new Date().toISOString(),
        })
        .eq("id", existingUser.id);
    } else {
      await supabase.from("users").insert({
        telegram_user_id: telegramUser.id,
        telegram_username: telegramUser.username,
        first_name: telegramUser.first_name,
        interaction_count: 1,
      });
    }
  } catch (error) {
    console.error("Error tracking user:", error);
  }
}

async function sendTelegramMessage(
  chatId: number,
  text: string,
  inlineKeyboard?: any[]
) {
  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  if (!botToken) throw new Error("TELEGRAM_BOT_TOKEN not set");

  const payload: any = {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
  };

  if (inlineKeyboard && inlineKeyboard.length > 0) {
    payload.reply_markup = {
      inline_keyboard: inlineKeyboard,
    };
  }

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  return await response.json();
}

async function handleStartCommand(update: TelegramUpdate) {
  if (!update.message) return;

  const userId = update.message.from.id;
  const chatId = update.message.chat.id;

  await trackUser(update.message.from);

  const startMessage = `Welcome to <b>Novaex AI Exchange</b>\n\nIntroducing NovaEx AI - The future of crypto trading:\n\n✨ <b>AI-Powered Quant Strategies</b> - Automated trading optimized by AI\n🔄 <b>Multi-Exchange Integration</b> - Trade across multiple exchanges seamlessly\n🛡️ <b>Real-Time Risk Control</b> - Advanced risk management built-in\n🪙 <b>NEX Token Economy</b> - Earn and stake NEX for rewards and governance\n\n<b>Join Our Ecosystem</b>\n• Register and claim 10,000 NEX ($1,000 value)\n• Invite friends and earn more tokens\n• Stake NEX and earn passive rewards\n• Hold NEX for governance rights\n\n<i>Built for the next era of decentralized finance. Don't miss the opportunity to be part of something revolutionary.</i>`;

  const webAppUrl = `${Deno.env.get("APP_URL") || "https://your-app.vercel.app"}?tgWebAppStartParam=exchange`;

  const inlineKeyboard = [
    [
      {
        text: "💹 Exchange NEX",
        web_app: {
          url: webAppUrl,
        },
      },
    ],
    [
      {
        text: "🎁 Get Novaex AI",
        callback_data: "airdrop_info",
      },
    ],
    [
      {
        text: "📚 How to Withdraw",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
    ],
  ];

  await sendTelegramMessage(chatId, startMessage, inlineKeyboard);
}

async function handleCallbackQuery(update: TelegramUpdate) {
  if (!update.callback_query) return;

  const callbackQuery = update.callback_query;
  const chatId = callbackQuery.from.id;
  const callbackQueryId = callbackQuery.id;

  if (callbackQuery.data === "airdrop_info") {
    const airdropMessage = `<b>NovaEx AI Airdrop & Launch Details</b>\n\nNovaEx AI is now live and the $NEX airdrop window is open!\n\n<b>Airdrop Benefits:</b>\n• Register for free and get 10,000 NEX (~$1,000 value)\n• Invite your friends and stack even more tokens\n• Stake your NEX for passive income rewards\n• Hold NEX tokens for governance rights and exclusive platform perks\n\n<b>Why NovaEx AI?</b>\n\nBuilt for the next era of cryptocurrency with:\n• AI-powered quantitative trading strategies\n• Multi-exchange automation and execution\n• Real-time portfolio risk control\n• Advanced market analysis and signals\n\n<b>Claim Your Tokens Now</b>\n\nDon't miss this opportunity to be part of the revolution in AI-driven trading!\n\nRegister and claim your NEX coins: <a href="https://m.novaexai.com/register?inviteCode=3U4b5H">Join Now</a>\n\nEarly adopters get premium access and exclusive rewards. Join Early & Claim 🪙 NEX coins!`;

    await sendTelegramMessage(chatId, airdropMessage, [[{ text: "✓ Got it", callback_data: "close" }]]);
  }

  await fetch(`https://api.telegram.org/bot${Deno.env.get("TELEGRAM_BOT_TOKEN")}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
    }),
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const update: TelegramUpdate = await req.json();

    if (update.message?.text === "/start") {
      await handleStartCommand(update);
    } else if (update.callback_query) {
      await handleCallbackQuery(update);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing update:", error);
    return new Response(
      JSON.stringify({ ok: false, error: String(error) }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
