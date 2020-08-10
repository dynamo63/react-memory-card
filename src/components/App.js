import React, { useEffect, useState } from 'react';
import Header from './Header';
import CardMemory from './CardMemory';

function App() {

    const title = "Bienvenue dans le Jeu Memory Card";
    const [images, setImages] = useState([]);
    // const [count, setCount] = useState(0);
    const [imagesCorrect, setImagesCorrect] = useState([]);
    const MON_URL = 'https://picsum.photos/v2/list?page=1&limit=6';

    const handleTurn = id => {
        const newImages = [...images];
        const correctCardTab = [...imagesCorrect];
        const cardIndex = images.findIndex(image => image.id === id);
        newImages[cardIndex].reveal = true
        correctCardTab.push(newImages[cardIndex]);
        setImages(newImages);
        setImagesCorrect(correctCardTab);
        // setCount(count + 1);
    };

    const isCorrectCard = (card, array) => {
        const number_of_card = array.filter(image => image.url === card.url);
        if (number_of_card.length < 2) {
            card.reveal = false;
        }
        return card;
    }

    useEffect(() => {
        // url simple image "https://picsum.photos/id/1020/info"
        fetch(MON_URL)
        .then(data => data.json())
        .then(res => {
            const data = [...res].concat(res).sort(() => Math.random() - 0.5);
            const imagesData = data.map((item, index) => ({ id:index, url: item.download_url, reveal: false }));
            setImages(imagesData);
        })
        .catch(err => console.trace(err))
    },[]);

    useEffect(() => {
        if (imagesCorrect.length >= 2) {
            setTimeout(() => {
                imagesCorrect.forEach(image => isCorrectCard(image, imagesCorrect))
                const newImages = [...images].filter(image => { 
                    return image.id !== imagesCorrect[0].id || image.id !== imagesCorrect[1].id;
                });
                setImages(newImages);
                setImagesCorrect([]);
            }, 600);
        }
    },[imagesCorrect]);

    useEffect(() => {
        if (images.length !== 0 && images.every(image => image.reveal === true)) {
            // alert(count);
            console.log(images);
        }
    },[images])

    return (
        <div>
            <Header title={title} />
            <div className="container">
                <div className="columns is-multiline">
                    {images.map(image => 
                        <CardMemory 
                            id={image.id} 
                            img={image.url} 
                            reveal={image.reveal} 
                            key={image.id} 
                            onTurn={handleTurn}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;