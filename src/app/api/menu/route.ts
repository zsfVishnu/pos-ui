import { NextResponse } from 'next/server';
import { MenuResponse } from '@/types/menu';

const menuData: MenuResponse = {
  "menu": {
    "sections": [
      {
        "id": "sec_coolers",
        "title": "Coolers & Iced Teas",
        "items": [
          {
            "id": "itm_peach_passion_iced_tea",
            "name": "Peach Passion Fruit Iced Tea",
            "description": "Fragrant peach iced tea with tropical passion fruit.",
            "dietary_tags": ["vegetarian", "non_alcoholic"],
            "pricing": { "base_price": 220, "currency": "INR" },
            "add_ons": [{ "id": "add_boba", "name": "Tapioca boba", "price": 40 }]
          },
          {
            "id": "itm_watermelon_mojito",
            "name": "Watermelon Mojito (Non-Alcoholic)",
            "description": "Fresh watermelon, mint, lime and soda.",
            "dietary_tags": ["vegetarian", "non_alcoholic"],
            "pricing": { "base_price": 240, "currency": "INR" }
          }
        ]
      },
      {
        "id": "sec_coffee",
        "title": "Coffee & Cafe Drinks",
        "items": [
          {
            "id": "itm_cappuccino",
            "name": "Cappuccino",
            "description": "Double shot espresso with textured milk.",
            "dietary_tags": ["vegetarian", "contains_dairy"],
            "pricing": {
              "base_price": 180,
              "currency": "INR",
              "variants": [
                { "id": "var_s", "name": "Small", "price_delta": 0 },
                { "id": "var_m", "name": "Medium", "price_delta": 30 },
                { "id": "var_l", "name": "Large", "price_delta": 60 }
              ]
            },
            "add_ons": [
              { "id": "add_alt_milk_oat", "name": "Oat milk", "price": 40 },
              { "id": "add_extra_shot", "name": "Extra espresso shot", "price": 40 }
            ]
          }
        ]
      },
      {
        "id": "sec_starters",
        "title": "Starters & Sides",
        "items": [
          {
            "id": "itm_zucchini_fries",
            "name": "Zucchini Fries",
            "description": "Crispy battered zucchini, herbed aioli.",
            "dietary_tags": ["vegetarian"],
            "pricing": { "base_price": 290, "currency": "INR" }
          }
        ]
      }
    ]
  }
};

export async function GET() {
  return NextResponse.json(menuData);
}
