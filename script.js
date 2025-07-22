function compareTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    
    if (!text1.trim() || !text2.trim()) {
        alert('Por favor ingresa texto en ambos campos para comparar.');
        return;
    }
    
    // Dividir los textos en palabras
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);
    
    // Crear sets para encontrar palabras comunes y diferentes
    const set1 = new Set(words1.map(w => w.toLowerCase()));
    const set2 = new Set(words2.map(w => w.toLowerCase()));
    
    const commonWords = new Set([...set1].filter(x => set2.has(x)));
    const diffWords1 = new Set([...set1].filter(x => !set2.has(x)));
    const diffWords2 = new Set([...set2].filter(x => !set1.has(x)));
    
    // Resaltar texto 1
    const highlighted1 = words1.map(word => {
        const lowerWord = word.toLowerCase();
        if (commonWords.has(lowerWord)) {
            return `<span class="highlight-common">${word}</span>`;
        } else if (diffWords1.has(lowerWord)) {
            return `<span class="highlight-diff">${word}</span>`;
        }
        return word;
    }).join(' ');
    
    // Resaltar texto 2
    const highlighted2 = words2.map(word => {
        const lowerWord = word.toLowerCase();
        if (commonWords.has(lowerWord)) {
            return `<span class="highlight-common">${word}</span>`;
        } else if (diffWords2.has(lowerWord)) {
            return `<span class="highlight-diff">${word}</span>`;
        }
        return word;
    }).join(' ');
    
    // Mostrar resultados
    document.getElementById('result1').innerHTML = highlighted1;
    document.getElementById('result2').innerHTML = highlighted2;
    
    // Calcular estadísticas
    const totalWords = set1.size + set2.size;
    const commonWordsCount = commonWords.size;
    const diffWordsCount = diffWords1.size + diffWords2.size;
    const similarity = totalWords > 0 ? Math.round((commonWordsCount * 2 / totalWords) * 100) : 0;
    
    // Mostrar estadísticas
    document.getElementById('commonWords').textContent = commonWordsCount;
    document.getElementById('diffWords').textContent = diffWordsCount;
    document.getElementById('similarity').textContent = similarity + '%';
    document.getElementById('stats').style.display = 'block';
}

function clearAll() {
    document.getElementById('text1').value = '';
    document.getElementById('text2').value = '';
    document.getElementById('result1').innerHTML = '';
    document.getElementById('result2').innerHTML = '';
    document.getElementById('stats').style.display = 'none';
}

// Permitir comparación con Enter
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        compareTexts();
    }
});