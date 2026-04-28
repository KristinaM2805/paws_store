
const productsData = {
    cards: [
        {
            id: 1,
            name: "Airline-Approved Pet Travel Carrier",
            category: "Travel & Carriers",
            price: 54.99,
            oldPrice: 69.99,
            rating: 4,
            reviews: 124,
            image: "/img/photo1.jpeg",
            badge: "Best Seller"
        },
        {
            id: 2,
            name: "Interactive Rubber Chew Ball",
            category: "Toys & Scratchers",
            price: 15.99,
            oldPrice: 22.99,
            rating: 5,
            reviews: 89,
            image: "/img/photo2.jpeg",
            badge: "-30%"
        },
        {
            id: 3,
            name: "Reflective Nylon Dog Leash & Collar Set",
            category: "Leashes & Collars",
            price: 32.99,
            oldPrice: 45.99,
            rating: 4,
            reviews: 67,
            image: "/img/photo3.jpeg",
            badge: "Sale"
        },
        {
            id: 4,
            name: "Multi-Level Cat Scratching Post",
            category: "Toys & Scratchers",
            price: 89.99,
            oldPrice: 129.99,
            rating: 5,
            reviews: 256,
            image: "/img/photo4.jpeg",
            badge: "Popular"
        },
        {
            id: 5,
            name: "Orthopedic Memory Foam Pet Bed",
            category: "Beds & Furniture",
            price: 69.99,
            oldPrice: 99.99,
            rating: 4,
            reviews: 312,
            image: "/img/photo5.jpeg",
            badge: "-30%"
        },
        {
            id: 6,
            name: "Premium Stainless Steel Dog Bowl",
            category: "Bowls & Feeders",
            price: 24.99,
            oldPrice: 34.99,
            rating: 5,
            reviews: 178,
            image: "/img/photo6.jpeg",
            badge: "Best Seller"
        }
    ],
    
    productDetails: {
        1: {
            id: 1,
            category: "Travel & Carriers",
            name: "Airline-Approved Pet Travel Carrier",
            rating: 4,
            ratingText: "4 out of 5 stars",
            price: 54.99,
            keyHighlights: [
                "Dimensions: 18 x 11 x 11 inches",
                "Material: Polyester with Mesh Panels",
                "Weight Limit: Up to 15 lbs"
            ],
            description: "Soft-sided pet carrier approved for airline cabin use. Features mesh panels for ventilation, padded shoulder strap, and collapsible design for easy storage. Interior fleece pad provides comfort. Meets TSA requirements for in-cabin pet travel.",
            specifications: [
                { label: "DIMENSIONS", value: "18 x 11 x 11 inches" },
                { label: "MATERIAL", value: "Polyester with Mesh Panels" },
                { label: "Weight Limit", value: "Up to 15 lbs" },
                { label: "Airline Approved", value: "Yes (TSA Compliant)" },
                { label: "Features", value: "Collapsible, Padded Strap" }
            ],
            images: ["/img/photo1.jpeg", "/img/photo1.jpeg", "/img/photo1.jpeg"]
        },
        2: {
            id: 2,
            category: "Toys & Scratchers",
            name: "Interactive Rubber Chew Ball",
            rating: 5,
            ratingText: "5 out of 5 stars",
            price: 15.99,
            keyHighlights: [
                "Diameter: 3.5 inches",
                "Material: Natural Rubber",
                "Treat Compartment: Yes"
            ],
            description: "Durable rubber chew ball designed for aggressive chewers. Features textured surface for dental health and can be filled with treats for extended playtime. Bounces unpredictably for exciting fetch games. Non-toxic, BPA-free rubber material.",
            specifications: [
                { label: "Diameter", value: "3.5 inches" },
                { label: "MATERIAL", value: "Natural Rubber" },
                { label: "Treat Compartment", value: "Yes" },
                { label: "Safety", value: "BPA-Free, Non-Toxic" },
                { label: "Suitable For", value: "All Dog Sizes" }
            ],
            images: ["/img/photo2.jpeg", "/img/photo2.jpeg", "/img/photo2.jpeg"]
        },
        3: {
            id: 3,
            category: "Leashes & Collars",
            name: "Reflective Nylon Dog Leash & Collar Set",
            rating: 4,
            ratingText: "4 out of 5 stars",
            price: 32.99,
            keyHighlights: [
                "Leash Length: 6 feet",
                "Material: Nylon with Reflective Stitching",
                "Collar Size: Adjustable 14-20 inches"
            ],
            description: "High-visibility reflective dog leash and collar set perfect for evening walks. Durable nylon construction with reinforced stitching. Quick-release buckle and adjustable sizing for a perfect fit. Includes sturdy metal D-ring for tag attachment.",
            specifications: [
                { label: "LEASH LENGTH", value: "6 feet" },
                { label: "MATERIAL", value: "Nylon with Reflective Stitching" },
                { label: "COLLAR SIZE", value: "Adjustable 14-20 inches" },
                { label: "HARDWARE", value: "Metal D-ring & Clasp" },
                { label: "SUITABLE FOR", value: "Medium to Large Dogs" }
            ],
            images: ["/img/photo3.jpeg", "/img/photo3.jpeg", "/img/photo4.jpeg"]
        },
        4: {
            id: 4,
            category: "Toys & Scratchers",
            name: "Multi-Level Cat Scratching Post",
            rating: 5,
            ratingText: "5 out of 5 stars",
            price: 89.99,
            keyHighlights: [
                "Height: 38 inches",
                "Base Dimensions: 20 x 20 inches",
                "Material: Sisal Rope & Plush Fabric"
            ],
            description: "Three-tier cat scratching post with sisal rope wrapping and plush platforms. Provides multiple levels for climbing, scratching, and resting. Sturdy base ensures stability during active play. Natural jute fibers satisfy your cat's scratching instincts.",
            specifications: [
                { label: "HEIGHT", value: "38 inches" },
                { label: "BASE DIMENSIONS", value: "20 x 20 inches" },
                { label: "MATERIAL", value: "Sisal Rope & Plush Fabric" },
                { label: "PLATFORMS", value: "3 Levels" },
                { label: "WEIGHT CAPACITY", value: "Up to 25 lbs per platform" }
            ],
            images: ["/img/photo4.jpeg", "/img/photo4.jpeg", "/img/photo4.jpeg"]
        },
        5: {
            id: 5,
            category: "Beds & Furniture",
            name: "Orthopedic Memory Foam Pet Bed",
            rating: 4,
            ratingText: "4 out of 5 stars",
            price: 69.99,
            keyHighlights: [
                "Size: Large (40 x 28 inches)",
                "Foam Thickness: 4 inches",
                "Cover Material: Microfiber"
            ],
            description: "Luxurious memory foam pet bed with removable, machine-washable cover. Provides superior support for senior pets and those with joint issues. Water-resistant liner protects the foam core. Available in multiple sizes to fit all breeds.",
            specifications: [
                { label: "SIZE", value: "Large (40 x 28 inches)" },
                { label: "FOAM THICKNESS", value: "4 inches" },
                { label: "COVER MATERIAL", value: "Microfiber" },
                { label: "WASHING", value: "Machine Washable Cover" },
                { label: "WEIGHT", value: "8 lbs" }
            ],
            images: ["/img/photo5.jpeg", "/img/photo5.jpeg", "/img/photo5.jpeg"]
        },
        6: {
            id: 6,
            category: "Bowls & Feeders",
            name: "Premium Stainless Steel Dog Bowl",
            rating: 5,
            ratingText: "5 out of 5 stars",
            price: 24.99,
            keyHighlights: [
                "Material: Stainless Steel",
                "Capacity: 64 oz (1.9 L)",
                "Diameter: 8.5 inches"
            ],
            description: "Durable stainless steel dog bowl designed for medium to large breeds. Non-slip rubber base prevents sliding and spillage. Dishwasher safe and rust-resistant for long-lasting use. Perfect for both food and water.",
            specifications: [
                { label: "MATERIAL", value: "Stainless Steel" },
                { label: "CAPACITY", value: "64 oz (1.9 L)" },
                { label: "DIAMETER", value: "8.5 inches" },
                { label: "CARE", value: "Dishwasher Safe" },
                { label: "WEIGHT", value: "1.2 lbs" }
            ],
            images: ["/img/photo6.jpeg", "/img/photo6.jpeg", "/img/photo6.jpeg"]
        }
    }
};