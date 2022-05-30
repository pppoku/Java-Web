window.onload=function(){
	updateGK();
	//このページがロードした後で、イベントをtr、tdに付ける、そしてすべてのイベントに関する操作は.jsにまとめる
	//idによってテーブルを取る
	var fruitTbl = document.getElementById("tbl_fruit");
	//テーブル中のすべての行を取る
	var rows = fruitTbl.rows;
	//一番目の行や最後の行はイベントを付けない
	for(var i = 1; i < rows.length - 1; i++){
		var tr = rows[i];
		//イベントを付ける(functionの（）は書かない、もし書いたらすぐ使用された)
		//マウスが行にホバーや離れた時、色を変えるのイベント
		tr.onmouseover = showBGColor;
		tr.onmouseout = clearBGColor;
		//単価をホバーの時、マウスの様式や値の編集に関するイベント
		var cells = tr.cells;
		var priceTD = cells[1];
		priceTD.onmouseover = showHand;
		priceTD.onclick = editPrice;
		//削除操作に関するイベント
		var img = cells[4].firstChild;
		if(img && img.tagName == "IMG"){
			img.onclick = delFruit;
		}
	}
}

function delFruit(){
	if(event && event.srcElement && event.srcElement.tagName=="IMG"){
		//alertは一つのウィンドウを現れて、確定ボータンしかいない
		//confirmは一つのウィンドウを現れて、確定ボータンやキャンセルボータン二つがある、確定ボータンを押す時trueを返す、キャンセルを押す時falseを返す
		if(window.confirm("この行を削除したい？")){
			var img = event.srcElement;
			var tr = img.parentElement.parentElement;
			var fruitTbl = document.getElementById("tbl_fruit");
			//deleteRowはテーブルの方法、インデックスを指定された行を削除
			//tr.rowIndexはtrの方法、trのインデックスを獲得
			fruitTbl.deleteRow(tr.rowIndex);


			updateGK();
		}
	}
}

//マウスが単価セールにクリックの時、中の文字が編集できる
function editPrice(){
	if(event && event.srcElement && event.srcElement.tagName=="TD"){
		var priceTD = event.srcElement;
		//目的：今のpriceTDの一番目ノードはtext類型
		if(priceTD.firstChild && priceTD.firstChild.nodeType==3){
			//元のtextの内容を獲得
			var oldPrice = priceTD.innerText;
			//innerHTML:今のセールの中のHTMLを設置
			priceTD.innerHTML = "<input type='text'/ size='4'/>";
			var input = priceTD.firstChild;
			if(input.tagName=="INPUT"){
				input.value = oldPrice;
				//中の文字列を選定
				input.select();
				//入力ボックスが焦点を失た時、単価を更新
				input.onblur = updatePrice;
				//入力ボックスにキーボードが押されたイベントを付けて、入力内容を確認
				input.onkeydown = ckInput;
			}
		}
	}
}

//入力された値は数値のチェック
function ckInput(){
	var kc = event.keyCode;
	//ASCII:　数値0~9 : 48~57
	//backspace:8, enter:13
	if( !((kc >= 48 && kc <= 57) || kc == 8 || kc == 13) ){
		//違った入力を無効化
		event.returnValue = false;
	}

	if(kc == 13){
		event.srcElement.blur();
	}
}

//単価を更新
function updatePrice(){
	if(event && event.srcElement && event.srcElement.tagName=="INPUT"){
		var input = event.srcElement;
		var newPrice = input.value;
		//inputの親ノードはtd
		var priceTD = input.parentElement;
		priceTD.innerText = newPrice;
		
		//この行の小計を更新
		//priceTD.parentElementの親ノードはtr
		updateSK(priceTD.parentElement);
	}
}

//指定の行の小計を更新
function updateSK(tr){
	if(tr && tr.tagName == "TR"){
		var tds = tr.cells;
		var price = tds[1].innerText;
		var count = tds[2].innerText;
		//innerTextによって獲得されたの値はString、計算できるのためにintに変換
		var sk = parseInt(price) * parseInt(count);
		tds[3].innerText = sk;

		//合計を更新
		updateGK();
	}
}

//合計を更新
function updateGK(){
	var fruitTBL = document.getElementById("tbl_fruit");
	var rows = fruitTBL.rows;
	var sum = 0;
	for(var i = 1; i < rows.length - 1; i++){
		var tr = rows[i];
		var sk = parseInt(tr.cells[3].innerText);
		sum = sum + sk;
	}
	rows[rows.length-1].cells[1].innerText = sum;
}

//マウスがホバーの時、バックグラウンドの色を表す
function showBGColor(){
	//event:発生するエベント
	//event.srcElement：エベントがどこで発生した
	if(event && event.srcElement && event.srcElement.tagName=="TD"){
		//イベントが発生したtdを取る
		var td = event.srcElement;
		//そのtdが所属するtrを取る
		var tr = td.parentElement;
		//そのtrの様式を設定する
		tr.style.backgroundColor = "navy";
		//tr.cellsはこのtrの中のすべてのセールを取る、配列の形式で
		var tds = tr.cells;
		for(var i = 0; i < tds.length; i++){
			tds[i].style.color = "white";
		}
	}
}

//マウスが離れた時、元の様式に変える
function clearBGColor(){
	if(event && event.srcElement && event.srcElement.tagName=="TD"){
		var td = event.srcElement;
		var tr = td.parentElement;
		tr.style.backgroundColor = "transparent";
		var tds = tr.cells;
		for(var i = 0; i < tds.length; i++){
			tds[i].style.color = "threeddarkshadow";
		}
	}
}
//マウスが「単価」にホバーの時、マウスの様式を変える
function showHand(){
	if(event && event.srcElement && event.srcElement.tagName=="TD"){
		var td = event.srcElement;
		//cursor:カーソルの様式
		td.style.cursor="hand";
	}
}

