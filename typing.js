//必要なHTML要素の取得
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

//複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

//新しい配列を用意する
let checkTexts = [];

//ランダムなテキストを画面に表示する
const createText = () => {
    const p = document.getElementById('text');
    //配列のインデックス数からランダムな数値を生成する
    const rnd = Math.floor(Math.random() * textLists.length);
    
    //p要素の中身を空っぽにする
    p.textContent = '';
    
    //画面に表示するテキスト情報をcheckTexts配列に格納する
    checkTexts = textLists[rnd].split('').map(value => {
      //span要素を生成する
      const span = document.createElement('span');
      
      //span要素に配列の1文字ずつ当てはめる
      span.textContent = value;
      
      //span要素をp要素に追加していく
     p.appendChild(span);
     
     //1文字ずつchecktextsに格納していく
      return span;
    })
    
}; 

//スコアの初期値を設定する
let score = 0;

//キーイベントを入力判定処理
const keyDown = e => {
  if(e.key === checkTexts[0].textContent){
    
    //add-colorクラスを付与する
    checkTexts[0].className = 'add-color';
    
    //配列から1文字を削除する(最初の文字)
    checkTexts.shift();
    
    //正しい入力の時だけスコアを加算する
    score++;
    
    //最後まで入力したら新しいテキストを用意する
    if(!checkTexts.length) createText();
    //Shiftキーを押した時は色が変わらない
  }else if(e.key === 'Shift'){
    wrap.style.backgroundColor = '#666';
    
    //タイプミスした時だけ背景色を赤色に変える
  }else{
    wrap.style.backgroundColor = 'red';
  }

}; 

//ランク判定をメッセージ生成処理
const rankCheck = score => {
  //テキストを格納する変数を作る
  let text = '';
  
  //スコアに応じて異なるメッセージを変数textに格納する
   if(score < 100){
     text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
   } else if(score < 200) {
     text = `あなたのランクはSです。\nおめでとうございます！`;  
     text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
   } else if(score < 300) {
     text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
   } else if(score >= 300) {
     text = `あなたのランクはSです。\nおめでとうございます！`; 
   }
  
  return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;
}; 

//ゲームの終了処理
const gameOver = id => {
  
  //タイマーをストップする
  clearInterval(id);
  
  //スコアの値をrankCheck()に渡してダイアログで結果を表示する
  const result = confirm(rankCheck(score));
  
  if(result) window.location.reload();

}; 

//タイマー処理
const timer = () => {
  //タイマーの初期値を設定（60秒）
  let time = 60;
  
  
  //タイマー要素を取得する
  const count = document.getElementById('count');
  
  const id = setInterval(() =>{
    
    //カウントが0になったらタイマーを停止する
    if(time <= 0) gameOver(id);
    
    //1タイマーの表示を1ずつ減らしていく
    count.textContent = time--;
    
  },1000);
  
}; 


start.addEventListener('click', () => {
  //タイマー関数を追記する
  timer();
  
  //ランダムなテキストを表示する関数
  createText();
  
  //「スタート」ボタンを非表示にする処理を追記
  start.style.display = 'none';
  
  //キーボードのイベント処理
  document.addEventListener('keydown', keyDown);
  
  
}); //ゲームスタート時の処理　マウスボタンをクリックしたとき