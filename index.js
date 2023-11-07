'use strict';
{
  const question = document.querySelector('h3');
  const correctAnswer = document.getElementById('correct-answer');
  const hira = document.getElementById('hira');
  const helper = document.getElementById('helper');
  const btn = document.getElementById('start');
  const form = document.querySelector('form');
  const input = document.querySelector('input');

  const correctBgm = new Audio('door_chime2.mp3');
  const missBgm = new Audio('dog1a.mp3');
  const endBgm = new Audio('guitar7.mp3');

  let i = 0;
  let currentQuestion;
  let niceCount = 0;
  let missCount = 0;

  const questions = [
    { kanji: '魚', hira: '○○○', help: '海にいるよ', ancer: 'さかな' },
    { kanji: '秋刀魚', hira: '○○○', help: '秋が旬だよ', ancer: 'さんま' },
    { kanji: '猫', hira: '○○', help: 'ニャー', ancer: 'ねこ' },
  ];

  btn.addEventListener('click', () => {
    if (btn.textContent === 'ONE MORE') {
      location.reload();
    }

    if (niceCount + missCount === 3) {
      end();
      return;
    }

    i = Math.floor(Math.random() * questions.length);
    input.classList.remove('hide');
    input.focus();
    btn.classList.add('hide');
    set();

    if (btn.textContent === 'NEXT') {
      question.classList.remove('red', 'blue');
    }
    return i;

  });


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    judge();
  })


  const set = () => {
    currentQuestion = questions.splice(i, 1)[0];
    question.textContent = currentQuestion.kanji;
    hira.textContent = currentQuestion.hira;
    helper.textContent = `ヒント：${currentQuestion.help}`;
    correctAnswer.classList.add('hide');
  }

  const judge = () => {
    if (input.value === currentQuestion.ancer) {
      corect();
    } else {
      miss();
    }
  }

  const corect = () => {
    question.textContent = '正解！';
    question.classList.add('red');
    niceCount++;
    correctBgm.play();
    same();
  }

  const miss = () => {
    question.textContent = '不正解';
    question.classList.add('blue');
    correctAnswer.classList.remove('hide');
    correctAnswer.textContent = `正解： ${currentQuestion.ancer}`;
    missCount++;
    missBgm.play();
    same();
  }

  const same = () => {
    hira.textContent = '次の問題へ';
    helper.textContent = '';
    btn.classList.remove('hide');
    btn.textContent = 'NEXT';
    input.classList.add('hide');
    endBefore();
    input.value = '';
  }

  const end = () => {
    question.textContent = `終了`;
    question.classList.remove('red', 'blue');
    correctAnswer.classList.add('hide');
    form.classList.add('hide');
    btn.classList.remove('hide');
    btn.textContent = 'ONE MORE';
    hira.textContent = `${niceCount + missCount}問中 ${niceCount}問 正解！`;
    endBgm.play();
  }

  const endBefore = () => {
    if (questions.length === 0) {
      hira.textContent = '結果へ';
      btn.textContent = 'END';
    }
  }



}