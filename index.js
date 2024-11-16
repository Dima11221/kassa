const data = [
    {
        id: 123,
        title: 'Молоко',
        price: 100,
        src: '',
    },
    {
        id: 321,
        title: 'Шоколад',
        price: 50,
        src: '',
    },
    {
        id: 231,
        title: 'Вода',
        price: 24,
        src: '',
    },
    {
        id: 412,
        title: 'Хлеб',
        price: 33,
        src: '',
    },
]

let cart = []  //переделать капсом
const form = document.querySelector('.form')
const cartUI = document.querySelector('.cart')
const total = document.querySelector('.total')
const print = document.querySelector('.print')
const search = document.querySelector('.search')
const searchInput = document.querySelector('.searchInput')
const clearCart = document.querySelector('.clearCart')

clearCart.addEventListener('click', () => {
    cart = [];
    cartUI.innerHTML = '';
})

searchInput.addEventListener('input', (e) => {
    if (e.target.value.trim()) {
        items = data.filter(item => item.title.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()))
    
        // search.childNodes.forEach(el => el.remove())
        search.innerHTML = '';
        
        items.forEach((el) => {
            const li = document.createElement('li');
            li.id = el.id;
            li.innerText = `Продукт: ${el.title}, цена:${el.price}`;

            const img = document.createElement('img');
            img.src= el.src
            li.append(img)
            // начать тут!!!!!!!!!!!!!!!!!!
            li.addEventListener('click', () => {
                
                getItem(el.id);
                cartPaint(); 
                search.innerHTML = '';
                searchInput.value = '';
            })
            search.appendChild(li)
        })   
    } else {
        search.childNodes.forEach(el => el.remove())
    }
    
    
})

const cartPaint = () => {
    cartUI.innerHTML = '';
    cart.forEach(el => {
        const liCart = document.createElement('li');
        liCart.id = el.id;
        liCart.innerText = `${el.title} ${el.count > 1 ? `${el.price} X ${el.count} = ${el.price * el.count} р.` : `${el.price} р.`}`;
        liCart.appendChild(changeCount('plus'))
        liCart.appendChild(changeCount('minus'))
        cartUI.appendChild(liCart)
    })
    const total = document.createElement('h3')
    total.innerText = `ИТОГ: ${cart.reduce((total, el) => total += el.count ? el.count * el.price : el.price, 0)}рублей`
    cartUI.append(total)
}

const changeCount = (plusOrMinus) => {
    const button = document.createElement('button');
    button.id = plusOrMinus
    button.innerText = plusOrMinus === 'plus' ? '+' : '-';
    button.addEventListener('click', () => {
        cart = cart.map(el => {
            if (el.id === Number(button.parentElement.id)) {   // + - аналог Number()
                return {    
                    ...el,
                    count: plusOrMinus === 'plus' ? el.count + 1 : el.count - 1
                };
            } else {
                return el
            }
        })
        cart = cart.filter(el => el.count > 0)  // если false - не включает в массив
        
        cartPaint()
    })
    return button
}

const getItemData = (item) => {
    if(item.count > 1){
        return `${item.title + ' x' + item.count} ----------------------- ${item.price * item.count}р`
    } else {
        return `${item.title} ----------------------- ${item.price}р`
    }
} 

const printTotal = (cart) => {
    const totalCart = cart.map((el) => getItemData(el)).join('\n');
    alert(totalCart)   
}

// const setItemInUICart = (item) => {
//     const itemUI = document.createElement('ul')

//     itemUI.textContent = getItemData(item)
    
//     return itemUI
// }

const getItem = (id) => {
    const cartItem = data.find(el => el.id === id); 
    const isCart = cart.some(el => el.id === id);
    
    if(isCart) {
        cart = cart.map(el => {
            if (el.id === id) {
                return {    
                    ...el,
                    count: el.count + 1
                };
            } else {
                return el
            }
        })
        
          
    } else {
        cart.push({...cartItem, count:1}); // + - перевод к числу
    }

}

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const item = data.find(el => el.id === e.target[0].valueAsNumber)

//     if(item) {
//         cart.push(getItem(item))
//         e.target[0].value = ''
//     } else {
//         alert('Товар не найден')
//     }

//     while (cartUI.firstChild) {
//         cartUI.firstChild.remove()
//     }

//     cart.forEach((el) => {
//         cartUI.appendChild(setItemInUICart(el))
//     })

//     total.textContent = `ИТОГ: ${cart.reduce((total, el) => total += el.count ? el.count * el.price : el.price, 0)}рублей`
// })

print.addEventListener('click', () => {
    printTotal(cart)
})
