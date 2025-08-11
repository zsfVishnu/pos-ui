import { CafeSummary, Review, MenuResponse } from '@/types/menu';

export const cafeSummary: CafeSummary = {
  name: "The Peck",
  tagline: "Where every sip tells a story",
  about: "Nestled in the heart of the city, The Peck is your neighborhood sanctuary for exceptional coffee, fresh pastries, and warm conversations. We source our beans from sustainable farms and craft each cup with passion, creating a space where community thrives over great food and drink.",
  heroImage: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200"
};

export const reviews: Review[] = [
  {
    id: "rev_1",
    author: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    text: "Amazing coffee and the coziest atmosphere! The baristas really know their craft and the pastries are always fresh.",
    source: "Google"
  },
  {
    id: "rev_2",
    author: "Mike Chen",
    rating: 5,
    date: "2024-01-12",
    text: "Best cappuccino in town! Love the oat milk option and the staff is incredibly friendly.",
    source: "Yelp"
  },
  {
    id: "rev_3",
    author: "Emma K.",
    rating: 4,
    date: "2024-01-10",
    text: "Great spot for working remotely. WiFi is fast, coffee is excellent, and they have plenty of seating.",
    source: "Google"
  },
  {
    id: "rev_4",
    author: "David R.",
    rating: 5,
    date: "2024-01-08",
    text: "The watermelon mojito is refreshing and perfect for summer. Highly recommend the zucchini fries too!",
    source: "TripAdvisor"
  },
  {
    id: "rev_5",
    author: "Lisa P.",
    rating: 5,
    date: "2024-01-05",
    text: "Fantastic local cafe with a warm, welcoming vibe. The peach iced tea is my new favorite!",
    source: "Google"
  },
  {
    id: "rev_6",
    author: "Guest",
    rating: 4,
    date: "2024-01-03",
    text: "Clean, modern space with great coffee. The staff is knowledgeable about their menu and very helpful.",
    source: "Yelp"
  }
];

export const enhancedMenuData: MenuResponse = {
  "menu": {
    "sections": [
      {
        "id": "sec_coolers",
        "title": "Coolers & Iced Tea",
        "items": [
          {
            "id": "itm_peach_passion_iced_tea",
            "name": "Peach Passion Fruit Iced Tea",
            "description": "Fragrant peach iced tea with tropical passion fruit notes",
            "dietaryTags": ["vegetarian", "non_alcoholic"],
            "pricing": { "basePrice": 220, "currency": "INR" },
            "addOns": [{ "id": "add_boba", "name": "Tapioca boba", "price": 40 }],
            "category": "beverages",
            "tags": ["trending", "refreshing"],
            "image": "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400",
            "isTrending": true
          },
          {
            "id": "itm_watermelon_mojito",
            "name": "Watermelon Mojito (Non-Alcoholic)",
            "description": "Fresh watermelon, mint, lime and soda water",
            "dietaryTags": ["vegetarian", "non_alcoholic"],
            "pricing": { "basePrice": 240, "currency": "INR" },
            "category": "beverages",
            "tags": ["popular", "refreshing"],
            "image": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=400",
            "isPopular": true
          },
          {
            "id": "itm_mango_lassi",
            "name": "Mango Lassi",
            "description": "Creamy yogurt drink with fresh mango pulp",
            "dietaryTags": ["vegetarian"],
            "pricing": { "basePrice": 180, "currency": "INR" },
            "category": "beverages",
            "tags": ["traditional"],
            "image": "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400"
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
            "description": "Double shot espresso with perfectly textured milk",
            "dietaryTags": ["vegetarian", "contains_dairy"],
            "pricing": {
              "basePrice": 180,
              "currency": "INR",
              "variants": [
                { "id": "var_s", "name": "Small", "priceDelta": 0 },
                { "id": "var_m", "name": "Medium", "priceDelta": 30 },
                { "id": "var_l", "name": "Large", "priceDelta": 60 }
              ]
            },
            "addOns": [
              { "id": "add_alt_milk_oat", "name": "Oat milk", "price": 40 },
              { "id": "add_extra_shot", "name": "Extra espresso shot", "price": 40 }
            ],
            "category": "coffee",
            "tags": ["popular", "classic"],
            "image": "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400",
            "isPopular": true
          },
          {
            "id": "itm_cold_brew",
            "name": "Cold Brew Coffee",
            "description": "Smooth, rich cold-brewed coffee served over ice",
            "dietaryTags": ["vegetarian", "vegan"],
            "pricing": { "basePrice": 200, "currency": "INR" },
            "category": "coffee",
            "tags": ["trending"],
            "image": "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400",
            "isTrending": true
          },
          {
            "id": "itm_spiced_latte",
            "name": "Spiced Chai Latte",
            "description": "Traditional chai spices with steamed milk",
            "dietaryTags": ["vegetarian", "contains_dairy"],
            "pricing": { "basePrice": 160, "currency": "INR" },
            "category": "coffee",
            "tags": ["spicy", "traditional"],
            "spiceLevel": 2,
            "image": "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
            "isSpicy": true
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
            "description": "Crispy battered zucchini sticks with herbed aioli",
            "dietaryTags": ["vegetarian"],
            "pricing": { "basePrice": 290, "currency": "INR" },
            "category": "starters",
            "tags": ["popular"],
            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
            "isPopular": true
          },
          {
            "id": "itm_spicy_wings",
            "name": "Spicy Buffalo Wings",
            "description": "Crispy chicken wings tossed in spicy buffalo sauce",
            "dietaryTags": ["contains_dairy"],
            "pricing": { "basePrice": 380, "currency": "INR" },
            "category": "starters",
            "tags": ["spicy", "trending"],
            "spiceLevel": 4,
            "image": "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400",
            "isSpicy": true,
            "isTrending": true
          },
          {
            "id": "itm_hummus_plate",
            "name": "Mediterranean Hummus Plate",
            "description": "Creamy hummus with pita bread, olives, and vegetables",
            "dietaryTags": ["vegetarian", "vegan"],
            "pricing": { "basePrice": 250, "currency": "INR" },
            "category": "starters",
            "tags": ["healthy"],
            "image": "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
        ]
      },
      {
        "id": "sec_mains",
        "title": "Main Courses",
        "items": [
          {
            "id": "itm_paneer_curry",
            "name": "Spicy Paneer Curry",
            "description": "Rich tomato-based curry with cottage cheese and aromatic spices",
            "dietaryTags": ["vegetarian", "contains_dairy"],
            "pricing": { "basePrice": 420, "currency": "INR" },
            "category": "mains",
            "tags": ["spicy", "popular"],
            "spiceLevel": 3,
            "image": "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
            "isSpicy": true,
            "isPopular": true
          },
          {
            "id": "itm_grilled_sandwich",
            "name": "Grilled Veggie Sandwich",
            "description": "Grilled vegetables with cheese on artisan bread",
            "dietaryTags": ["vegetarian", "contains_dairy"],
            "pricing": { "basePrice": 280, "currency": "INR" },
            "category": "mains",
            "tags": ["trending"],
            "image": "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=400",
            "isTrending": true
          }
        ]
      },
      {
        "id": "sec_desserts",
        "title": "Desserts",
        "items": [
          {
            "id": "itm_chocolate_cake",
            "name": "Decadent Chocolate Cake",
            "description": "Rich chocolate cake with ganache frosting",
            "dietaryTags": ["vegetarian", "contains_dairy"],
            "pricing": { "basePrice": 180, "currency": "INR" },
            "category": "desserts",
            "tags": ["popular"],
            "image": "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
            "isPopular": true
          },
          {
            "id": "itm_fruit_tart",
            "name": "Seasonal Fruit Tart",
            "description": "Fresh seasonal fruits on vanilla custard base",
            "dietaryTags": ["vegetarian", "contains_dairy"],
            "pricing": { "basePrice": 160, "currency": "INR" },
            "category": "desserts",
            "tags": ["fresh"],
            "image": "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
        ]
      }
    ]
  }
};