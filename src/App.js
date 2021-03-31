import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState(0);
    const [data, setData] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input <= 0) {
            alert('Cant be zero');
            e.target.reset();
            return;
        }
        setData(await fetchData());
    };
    const handleCopy = () => {
        if (!data) return;
        navigator.clipboard.writeText(data.join(' '));
        alert('Copied!');
    };
    const fetchData = async () => {
        const url = `https://baconipsum.com/api/?type=all-meat&paras=${input}`;
        try {
            const response = await axios.get(url);
            if (response.status >= 400) {
                const error = new Error(response.statusText);
                throw error;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className='section-center'>
            <h3>tired of boring lorem ipsum?</h3>
            <form className='lorem-form' onSubmit={handleSubmit}>
                <label htmlFor='amount'>paragraphs:</label>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type='number'
                    name='amount'
                    id='amount'
                    min='0'
                />
                <button className='btn'>generate</button>
            </form>
            <article className='lorem-text'>
                {data &&
                    data.map((item, index) => {
                        return <p key={index}>{item}</p>;
                    })}
            </article>
            <button onClick={handleCopy} className='btn'>
                Copy
            </button>
        </section>
    );
}

export default App;
