"use client";
import { useState } from 'react';

const recipes = {
  sambal: {
    name: "Sambal Belacan",
    base: {
      "Bird's Eye Chili (g)": 100,
      "Garlic (g)": 50,
      "Lime (pcs)": 1,
      "Belacan (g)": 30,
      "Salt & Sugar (g)": 5
    }
  },
  garlic: {
    name: "Crispy Garlic Shrimp Chili",
    base: {
      "Dried Chili (g)": 30,
      "Garlic (g)": 40,
      "Dried Shrimp (g)": 20,
      "Chili Oil (ml)": 30,
      "Salt & Seasoning (g)": 5
    }
  }
};

export default function ChilliRecipeCalculator() {
  const [selected, setSelected] = useState("sambal");
  const [bottles, setBottles] = useState(0);
  const [ingredientQty, setIngredientQty] = useState('');
  const [ingredientName, setIngredientName] = useState(Object.keys(recipes[selected].base)[0]);
  const [results, setResults] = useState({});
  const [mode, setMode] = useState('bottles');

  const handleBottleCalc = () => {
    const updated = {};
    Object.entries(recipes[selected].base).forEach(([key, value]) => {
      updated[key] = value * bottles;
    });
    setResults(updated);
  };

  const handleIngredientCalc = () => {
    const perBottle = recipes[selected].base[ingredientName];
    const numBottles = Math.floor(Number(ingredientQty) / perBottle);
    const updated = {};
    Object.entries(recipes[selected].base).forEach(([key, value]) => {
      updated[key] = value * numBottles;
    });
    setResults(updated);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Chilli Now Recipe Calculator</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => { setSelected('sambal'); setIngredientName(Object.keys(recipes['sambal'].base)[0]); setResults({}); }}>
          Sambal Belacan
        </button>
        <button onClick={() => { setSelected('garlic'); setIngredientName(Object.keys(recipes['garlic'].base)[0]); setResults({}); }} style={{ marginLeft: '1rem' }}>
          Garlic Shrimp Chili
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setMode('bottles')}>By Bottles</button>
        <button onClick={() => setMode('ingredient')} style={{ marginLeft: '1rem' }}>By Ingredient</button>
      </div>

      {mode === 'bottles' ? (
        <div style={{ marginBottom: '1rem' }}>
          <label>Number of Bottles:</label><br />
          <input
            type="number"
            value={bottles}
            onChange={e => setBottles(Number(e.target.value))}
            style={{ padding: '0.5rem', width: '100%' }}
          />
          <button onClick={handleBottleCalc} style={{ marginTop: '1rem' }}>Calculate</button>
        </div>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <label>Select Ingredient:</label><br />
          <select
            value={ingredientName}
            onChange={e => setIngredientName(e.target.value)}
            style={{ padding: '0.5rem', width: '100%' }}
          >
            {Object.keys(recipes[selected].base).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
          <label>Total Quantity You Have (in unit shown):</label><br />
          <input
            type="number"
            value={ingredientQty}
            onChange={e => setIngredientQty(e.target.value)}
            style={{ padding: '0.5rem', width: '100%' }}
          />
          <button onClick={handleIngredientCalc} style={{ marginTop: '1rem' }}>Calculate</button>
        </div>
      )}

      {Object.keys(results).length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Calculated Recipe for {recipes[selected].name}:</h2>
          <ul>
            {Object.entries(results).map(([key, value]) => (
              <li key={key}>{key}: <strong>{value}</strong></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
