const poojas = [
    {
        id: 1,
        name: 'Ganesh Pooja',
        price: '₹1,500',
        duration: '2-3 hours',
        description: 'Traditional Ganesh worship ceremony for removing obstacles...',
        image: 'https://dummyimage.com/400x200/000/fff&text=Ganesh+Pooja',
        items: ["Turmeric", "Kumkum", "Flowers", "Coconut", "Camphor"]
    },
    {
        id: 2,
        name: 'Lakshmi Pooja',
        price: '₹1,200',
        duration: '1.5-2 hours',
        description: 'Sacred ritual to invoke Goddess Lakshmi for wealth, prosperity, and...',
        image: 'https://dummyimage.com/400x200/f3f3f3/000&text=Lakshmi+Pooja',
        items: ["Turmeric", "Kumkum", "Flowers", "Coconut", "Camphor","dhup sticks"]
    },
    {
        id: 3,
        name: 'Satyanarayan Pooja',
        price: '₹2,000',
        duration: '3-4 hours',
        description: 'Complete Satyanarayan Katha and pooja for fulfilling wishes and...',
        image: 'https://dummyimage.com/400x200/eeeeee/aaa&text=Satyanarayan+Pooja',
        items: ["Turmeric", "Kumkum", "Flowers", "Coconut", "Camphor","dhupsticks","dry fruits", "beatal nuts"]
    },
];
 const getPoojaById = async (id) => {
    debugger
    return poojas.find((pooja) => pooja.id === Number(id));
  };
export {poojas,getPoojaById}