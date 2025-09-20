const storedFAQcardData = localStorage.getItem('FAQCardData');
let FAQCardData = storedFAQcardData
    ? JSON.parse(storedFAQcardData)
    : [
        {
            filter: "All",
            btn: [
                {
                    title: "How can I place an order on StyleLoom?",
                    desc: "Ordering is easy! Simply browse our website, add items to your cart, and proceed to checkout. Follow the prompts to enter your details and complete your purchase."
                },
                {
                    title: "What payment methods do you accept?",
                    desc: "We accept a variety of payment methods, including credit/debit cards, net banking, and select digital wallets. Choose the option that suits you best during checkout."
                },
                {
                    title: "How can I track my order?",
                    desc: "Once your order is dispatched, you'll receive a tracking number via email. Use this number to track your package in real-time on our website."
                },

                {
                    title: " Can I modify or cancel my order after placing it?",
                    desc: "Unfortunately, once an order is confirmed, modifications or cancellations may not be possible. Please review your order carefully before completing the purchase."
                },

                {
                    title: "How do I initiate a return?",
                    desc: "Visit our Returns page and follow the provided instructions. Ensure your item meets our return criteria, and our team will guide you through the process."
                },

                {
                    title: "Do you offer exchanges for products?",
                    desc: "At this time, we don't offer direct product exchanges. If you'd like a different item, please initiate a return and place a new order."
                }

            ]
        },
        {
            filter: "Ordering",
            btn: [
                {
                    title: "How can I place an order on StyleLoom?",
                    desc: "Ordering is easy! Simply browse our website, add items to your cart, and proceed to checkout. Follow the prompts to enter your details and complete your purchase."
                },
                {
                    title: " Can I modify or cancel my order after placing it?",
                    desc: "Unfortunately, once an order is confirmed, modifications or cancellations may not be possible. Please review your order carefully before completing the purchase."
                },
                {
                    title: "How do I initiate a return?",
                    desc: "Visit our Returns page and follow the provided instructions. Ensure your item meets our return criteria, and our team will guide you through the process."
                },
                {
                    title: "How can I track my order?",
                    desc: "Once your order is dispatched, you'll receive a tracking number via email. Use this number to track your package in real-time on our website."
                },
                {
                    title: "Do you offer exchanges for products?",
                    desc: "At this time, we don't offer direct product exchanges. If you'd like a different item, please initiate a return and place a new order."
                },
                {
                    title: "What payment methods do you accept?",
                    desc: "We accept a variety of payment methods, including credit/debit cards, net banking, and select digital wallets. Choose the option that suits you best during checkout."
                }
            ]
        },
        {
            filter: "Shipping",
            btn: [
                {
                    title: "How do I initiate a return?",
                    desc: "Visit our Returns page and follow the provided instructions. Ensure your item meets our return criteria, and our team will guide you through the process."
                },
                {
                    title: "How can I track my order?",
                    desc: "Once your order is dispatched, you'll receive a tracking number via email. Use this number to track your package in real-time on our website."
                },
                {
                    title: "How can I place an order on StyleLoom?",
                    desc: "Ordering is easy! Simply browse our website, add items to your cart, and proceed to checkout. Follow the prompts to enter your details and complete your purchase."
                },
                {
                    title: " Can I modify or cancel my order after placing it?",
                    desc: "Unfortunately, once an order is confirmed, modifications or cancellations may not be possible. Please review your order carefully before completing the purchase."
                },
                {
                    title: "Do you offer exchanges for products?",
                    desc: "At this time, we don't offer direct product exchanges. If you'd like a different item, please initiate a return and place a new order."
                },
                {
                    title: "What payment methods do you accept?",
                    desc: "We accept a variety of payment methods, including credit/debit cards, net banking, and select digital wallets. Choose the option that suits you best during checkout."
                }
            ]
        },
        {
            filter: "Returns",
            btn: [
                {
                    title: "Do you offer exchanges for products?",
                    desc: "At this time, we don't offer direct product exchanges. If you'd like a different item, please initiate a return and place a new order."
                },
                {
                    title: "How do I initiate a return?",
                    desc: "Visit our Returns page and follow the provided instructions. Ensure your item meets our return criteria, and our team will guide you through the process."
                },
                {
                    title: "How can I track my order?",
                    desc: "Once your order is dispatched, you'll receive a tracking number via email. Use this number to track your package in real-time on our website."
                },
                {
                    title: "How can I place an order on StyleLoom?",
                    desc: "Ordering is easy! Simply browse our website, add items to your cart, and proceed to checkout. Follow the prompts to enter your details and complete your purchase."
                },
                // {
                //     title: "What payment methods do you accept?",
                //     desc: "We accept a variety of payment methods, including credit/debit cards, net banking, and select digital wallets. Choose the option that suits you best during checkout."
                // },
                // {
                //     title: " Can I modify or cancel my order after placing it?",
                //     desc: "Unfortunately, once an order is confirmed, modifications or cancellations may not be possible. Please review your order carefully before completing the purchase."
                // }
            ]
        },
        {
            filter: "Support",
            btn: [
                // {
                //     title: "Do you offer exchanges for products?",
                //     desc: "At this time, we don't offer direct product exchanges. If you'd like a different item, please initiate a return and place a new order."
                // },
                // {
                //     title: "How do I initiate a return?",
                //     desc: "Visit our Returns page and follow the provided instructions. Ensure your item meets our return criteria, and our team will guide you through the process."
                // },
                {
                    title: "How can I track my order?",
                    desc: "Once your order is dispatched, you'll receive a tracking number via email. Use this number to track your package in real-time on our website."
                },
                {
                    title: "How can I place an order on StyleLoom?",
                    desc: "Ordering is easy! Simply browse our website, add items to your cart, and proceed to checkout. Follow the prompts to enter your details and complete your purchase."
                },
                {
                    title: "What payment methods do you accept?",
                    desc: "We accept a variety of payment methods, including credit/debit cards, net banking, and select digital wallets. Choose the option that suits you best during checkout."
                },
                {
                    title: " Can I modify or cancel my order after placing it?",
                    desc: "Unfortunately, once an order is confirmed, modifications or cancellations may not be possible. Please review your order carefully before completing the purchase."
                }
            ]
        }
    ];

if (!storedFAQcardData) {
    localStorage.setItem("FAQCardData", JSON.stringify(FAQCardData));
}
export const exportedFAQCardData = FAQCardData;