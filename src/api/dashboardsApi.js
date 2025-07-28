const poojas = [
    {
        id: 1,
        name: 'Ganesh Pooja',
        price: '₹1,500',
        duration: '2-3 hours',
        description: 'Traditional Ganesh worship ceremony for removing obstacles...',
        image: 'https://dummyimage.com/400x200/000/fff&text=Ganesh+Pooja',
        items: [{
            name: "Turmeric",
            quantity: "100 gms",
            price: 20
        }, {
            name: "Kumkum",
            quantity: "100 gms",
            price: 20
        }, {
            name: "Flowers",
            quantity: "250 gms",
            price: 30
        }, {
            name: "Coconut",
            quantity: "3",
            price: 150
        }, {
            name: "Camphor",
            quantity: "100 gms",
            price: 40
        }]
    },
    {
        id: 2,
        name: 'Lakshmi Pooja',
        price: '₹1,200',
        duration: '1.5-2 hours',
        description: 'Sacred ritual to invoke Goddess Lakshmi for wealth, prosperity, and...',
        image: 'https://dummyimage.com/400x200/f3f3f3/000&text=Lakshmi+Pooja',
        items: [{
            name: "Turmeric",
            quantity: "100 gms",
            price: 20
        }, {
            name: "Kumkum",
            quantity: "100 gms",
            price: 20
        }, {
            name: "Flowers",
            quantity: "250 gms",
            price: 30
        }, {
            name: "Coconut",
            quantity: "3",
            price: 150
        }, {
            name: "Camphor",
            quantity: "100 gms",
            price: 40
        }, {
            name: "dhup sticks",
            quantity: "1 pack",
            price: 40
        }]

    },
    {
        id: 3,
        name: 'Satyanarayan Pooja',
        price: '₹2,000',
        duration: '3-4 hours',
        description: 'Complete Satyanarayan Katha and pooja for fulfilling wishes and...',
        image: 'https://dummyimage.com/400x200/eeeeee/aaa&text=Satyanarayan+Pooja',
        items: [{
            name: "Turmeric",
            quantity: "100 gms",
            price: 20,
        }, {
            name: "Kumkum",
            quantity: "100 gms",
            price: 20
        }, {
            name: "Flowers",
            quantity: "250 gms",
            price: 30
        }, {
            name: "Coconut",
            quantity: "3",
            price: 150
        }, {
            name: "Camphor",
            quantity: "100 gms",
            price: 40
        }, {
            name: "dhup sticks",
            quantity: "1 pack",
            price: 40
        },{
            name: "dry fruits",
            quantity: "1 pack",
            price: 200
        },{
            name: "beatal nuts",
            quantity: "100 gms",
            price: 150
        }]
    },
];
const getPoojaById = async (id) => {
    return poojas.find((pooja) => pooja.id === Number(id));
};
export { poojas, getPoojaById }