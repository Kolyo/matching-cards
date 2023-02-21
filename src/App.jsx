import {useState, useEffect} from 'react'
import './App.css'
import Card from './components/card/Card.jsx'

function App() {
    const cardsCount = 16
    const [cards, setCards] = useState([]);
    const [matches, setMatches] = useState(0);
    const [turns, setTurns] = useState(0)
    const [reset, setReset] = useState(false);

    useEffect(() => {
            if (cardsCount > 0) {
                fetch('https://picsum.photos/v2/list?page=3&limit=' + Math.floor(cardsCount / 2))
                    .then(res => res.json())
                    .then(data => {
                        let items = [];
                        data.forEach(item => {
                            items.push({
                                id: Math.random(),
                                url: item.download_url,
                                isFlipped: false,
                                isDisabled: false
                            })
                            items.push({
                                id: Math.random(),
                                url: item.download_url,
                                isFlipped: false,
                                isDisabled: false
                            })
                        })

                        items.sort((a, b) => a.id - b.id)
                        return setCards(items);
                    })
                    .catch(e => console.error(e))
            }
        }, [reset]
    )

    useEffect(() => {
        if (cards.length === cardsCount) {
            let newCards = [...cards];
            let flipped = newCards.filter(card => (card.isFlipped && !card.isDisabled))

            if (flipped.length === 2) {
                newCards = newCards.map(item => {
                    if (!item.isDisabled && item.isFlipped) {
                        item.isFlipped = false;
                    }
                    return item;
                })

                setTimeout(() => {
                    setTurns(turns + 1);
                    setCards(newCards);
                }, 800)
            }
        }
    }, [cards])

    function flipCard(card) {
        if (!card.isDisabled) {
            let newCards = [...cards];
            let index = newCards.findIndex(item => item.id === card.id)
            if (index > -1) {
                newCards[index] = {
                    ...card,
                    isFlipped: !card.isFlipped
                }
            }

            let flipped = newCards.filter(card => (card.isFlipped && !card.isDisabled))

            if (flipped.length === 2) {
                if (flipped[0].url === flipped[1].url) {
                    newCards = newCards.map(item => { //spared the second loop due to only two options
                        if (item.id === flipped[0].id || item.id === flipped[1].id) {
                            item.isDisabled = true;
                        }
                        return item;
                    })
                    setTurns(turns + 1);
                    setMatches(matches + 1);
                }
            }

            setCards(newCards)
        }
    }

    const cardsList = cards.map(card => <Card card={card} key={card.id} handleClick={flipCard}/>)

    return (
        <div className="App">
            <h1>Matching cards</h1>
            <div className="cards-list">{cardsList}</div>

            {(matches * 2 === cardsCount) && <h2>You won with {turns} turns!</h2>}
            <button onClick={() => setReset(true)}>Reset game</button>
        </div>
    )
}

export default App
