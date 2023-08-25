const imgJSON = localStorage.getItem('igmJSON');
console.log('imgJSON:', imgJSON);

const resultNode = document.querySelector('.result');
if (imgJSON) {
    resultNode.innerHTML = imgJSON;
}

const btnNode = document.querySelector('.btn');

const inputNode1 = document.querySelector('#input1');

const inputNode2 = document.querySelector('#input2');

function useRequest(url, callback) {
    return fetch(url)
        .then((response) => {
            console.log('response', response);
            return response.json();
        })
        .then((json) => {
            return callback(json);
        })
        .catch(() => {
            console.log('error');
        });
}

function displayResult(apiData) {
    let images = '';
    apiData.forEach(item => {
        const imgBlock = `
      <div class="image">
        <img
          src="${item.download_url}"
        />
        <p>${item.author}</p>
      </div>
    `;
        images = images + imgBlock;
    });
    localStorage.setItem('igmJSON', images);
    resultNode.innerHTML = images;
}

btnNode.addEventListener('click', async () => {
    let page = Number(inputNode1.value);
    let limit = Number(inputNode2.value);
    if (page >= 1 && page <= 10 && limit >= 1 && limit <= 10) {

        await useRequest(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`, displayResult);
    }
    else {
        if (!(page >= 1 && page <= 10) && !(limit >= 1 && limit <= 10)) {
            resultNode.innerHTML = '<div class="result">Номер страницы и лимит вне диапазона от 1 до 10!</div>';
        }
        else if (!(page >= 1 && page <= 10)) {
            resultNode.innerHTML = '<div class="result">Номер страницы вне диапазона от 1 до 10!</div>';
        }
        else {
            resultNode.innerHTML = '<div class="result">Лимит вне диапазона от 1 до 10!</div>';
        }
    }
});
