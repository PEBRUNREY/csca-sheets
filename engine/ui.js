/* Shared UI text and helpers for every sheet. English + Russian.
   T(en, ru) makes a bilingual string. Math and Chinese terms are shared. */
const T = (en, ru) => ({ en, ru });

const UI = {
  en: {
    progress: 'Progress',
    reset: 'Reset', resetSure: 'Click again to erase',
    check: 'Check', hint: 'Hint', showAns: 'Show answers',
    allGood: 'All correct. Well done.',
    some: (a, b) => `${a} of ${b} correct. Red cells are wrong, try again.`,
    fill: 'Fill in every answer first.',
    mine: 'My answer', ref: 'Answer', gotIt: 'I got it', notYet: 'Not yet', gotItOn: 'Marked as understood',
    notice: 'What I notice', noticePh: 'Write one sentence in your own words…',
    showRule: 'Show the rule', stuck: 'I am stuck, show the rule anyway',
    rule: 'Rule', careful: 'Careful', worked: 'Worked example',
    exam: 'Exam-style check', start: (m) => `Start ${m} timer`,
    examIntro: (min, q, per, mins, n) => `The real exam gives ${min} minutes for ${q} questions, about ${per} seconds each. Give yourself ${mins} minutes for these ${n}, then press Check my answers. For every wrong answer, go back to the Part named and redo its tasks.`,
    back: 'Back to the list of topics', topics: 'Topics', next: 'Next topic', stop: 'Stop timer', timeUp: 'Time is up',
    checkAll: 'Check my answers', score: (a, b) => `Score: ${a} / ${b}`,
    review: 'Review', again: 'Try again',
    howTitle: 'How to use this sheet',
    steps: [
      'Do the tasks in order. Fill in every empty cell, then press Check.',
      'Where you see **What I notice**, write one sentence in your own words. The rule unlocks after that.',
      'Read the **Rule**, then do the **Try it** tasks.',
      'Finish with the exam-style questions at the end.'
    ],
    topic: 'Topic', partCol: 'Part', wording: 'How the exam words it',
    photoNote: 'Your progress is saved on this device only.',
    parts: 'Parts', none: 'none', task: 'Task', part: 'Part',
    opt: { yes: 'yes', no: 'no', same: 'same', opposite: 'opposite', neither: 'neither', up: 'always goes up', down: 'always goes down', change: 'changes direction', yaxis: 'the y-axis', origin: 'the origin', xaxis: 'the x-axis' }
  },
  ru: {
    progress: 'Прогресс',
    reset: 'Сбросить', resetSure: 'Нажмите ещё раз, чтобы стереть',
    check: 'Проверить', hint: 'Подсказка', showAns: 'Показать ответы',
    allGood: 'Всё верно. Отлично.',
    some: (a, b) => `Верно ${a} из ${b}. Красные ячейки неверны, попробуйте ещё раз.`,
    fill: 'Сначала заполните все ответы.',
    mine: 'Мой ответ', ref: 'Ответ', gotIt: 'Я понял(а)', notYet: 'Пока нет', gotItOn: 'Отмечено: понял(а)',
    notice: 'Что я заметил(а)', noticePh: 'Напишите одно предложение своими словами…',
    showRule: 'Показать правило', stuck: 'Не получается, показать правило',
    rule: 'Правило', careful: 'Осторожно', worked: 'Разобранный пример',
    exam: 'Проверка в формате экзамена', start: (m) => `Запустить таймер ${m}`,
    examIntro: (min, q, per, mins, n) => `На настоящем экзамене даётся ${min} минут на ${q} вопросов, то есть около ${per} секунд на вопрос. Дайте себе ${mins} мин. на эти ${n}. Затем нажмите «Проверить ответы». За каждый неверный ответ вернитесь к названной части и повторите её задания.`,
    back: 'Назад к списку тем', topics: 'Темы', next: 'Следующая тема', stop: 'Остановить таймер', timeUp: 'Время вышло',
    checkAll: 'Проверить ответы', score: (a, b) => `Результат: ${a} / ${b}`,
    review: 'Повторить', again: 'Ещё раз',
    howTitle: 'Как пользоваться листом',
    steps: [
      'Выполняйте задания по порядку. Заполните все пустые ячейки и нажмите «Проверить».',
      'Там, где написано **Что я заметил(а)**, напишите одно предложение своими словами. После этого откроется правило.',
      'Прочитайте **Правило**, затем выполните задания **Попробуйте сами**.',
      'В конце решите вопросы в формате экзамена.'
    ],
    topic: 'Тема', partCol: 'Часть', wording: 'Как это формулируют на экзамене',
    photoNote: 'Ваш прогресс сохраняется только на этом устройстве.',
    parts: 'Части', none: 'нет', task: 'Задание', part: 'Часть',
    opt: { yes: 'да', no: 'нет', same: 'одинаковые', opposite: 'противоположные', neither: 'ни то, ни другое', up: 'всегда растёт', down: 'всегда убывает', change: 'меняет направление', yaxis: 'оси y', origin: 'начала координат', xaxis: 'оси x' }
  }
};

/* option helpers */
const O = (k) => ({ k });                      // key into UI.opt
const YN = [O('yes'), O('no')];
const SON = [O('same'), O('opposite'), O('neither')];
const MON = [O('up'), O('down'), O('change')];
const LR = [{ k: 'left', en: 'left', ru: 'влево' }, { k: 'right', en: 'right', ru: 'вправо' }];
const COND = [{ k: 'suf', en: 'sufficient, not necessary', ru: 'достаточное, не необходимое' }, { k: 'nec', en: 'necessary, not sufficient', ru: 'необходимое, не достаточное' },
  { k: 'both', en: 'necessary and sufficient', ru: 'необходимое и достаточное' }, { k: 'neither', en: 'neither', ru: 'ни то, ни другое' }];

/* small static table */
const mini = (rows) => ({ k: 'html', html: '<div class="tw"><table class="tbl">' + rows.map((r, i) => '<tr>' + r.map(c => i === 0 || c === r[0] ? `<th>${c}</th>` : `<td>${c}</td>`).join('') + '</tr>').join('') + '</table></div>' });
