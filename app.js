// Initialize Tesseract worker
let worker = null;

const keywords = ['GPA', 'SAT', 'ACT', 'Admission Rate'];
const canvas = document.getElementById('pdfCanvas');
const ctx = canvas.getContext('2d');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const pageProgress = document.getElementById('pageProgress');

async function initTesseract() {
    if (!worker) {
        worker = await Tesseract.createWorker('eng');
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        console.log('Tesseract worker initialized');
    }
    return worker;
}

async function processPDF(file) {
    resultsDiv.innerHTML = '';
    loadingDiv.style.display = 'block';

    try {
        await initTesseract(); // Ensure Tesseract worker is initialized
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        const results = new Map();

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pageProgress.textContent = `${pageNum} / ${pdf.numPages}`;

            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2.0 });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
                canvasContext: ctx,
                viewport: viewport
            }).promise;

            // Ensure the canvas image is set correctly for OCR
            const { data: { text } } = await worker.recognize(canvas);

            keywords.forEach(keyword => {
                const index = text.indexOf(keyword);
                if (index !== -1 && !results.has(keyword)) {
                    const start = Math.max(0, index - 100);
                    const end = Math.min(text.length, index + 100);
                    results.set(keyword, {
                        page: pageNum,
                        context: text.slice(start, end).trim()
                    });
                }
            });
        }

        displayResults(results);
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = `
            <div class="result-card" style="color: red;">
                Error processing PDF: ${error.message}
            </div>
        `;
    } finally {
        loadingDiv.style.display = 'none';
    }
}

function displayResults(results) {
    resultsDiv.innerHTML = '<h2>Results</h2>';
    
    keywords.forEach(keyword => {
        const result = results.get(keyword);
        const card = document.createElement('div');
        card.className = 'result-card';
        
        if (result) {
            card.innerHTML = `
                <h3>${keyword}</h3>
                <p>Found on page ${result.page}</p>
                <div class="context">${result.context}</div>
            `;
        } else {
            card.innerHTML = `
                <h3>${keyword}</h3>
                <p>Not found in document</p>
            `;
        }
        
        resultsDiv.appendChild(card);
    });
}

document.getElementById('pdfInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        processPDF(file);
    }
});