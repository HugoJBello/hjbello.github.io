
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function generateFromObject (input, indexName, varName, withLoop) {
	var output = input + " blaObject";
 
	var str;
	var output= "";

	str = input.split("CONSTRUCTOR FUNCTION")[0];
	str= str.replaceAll("CREATE OR REPLACE.+","");
	str= str.replaceAll("\n", " ").replaceAll("\\(", "").replaceAll("\\)", "").replaceAll(";","");
	str= str.replaceAll("\\s+"," ");
	var startLoop = indexName + " := " + varName +".first();\nWHILE "+ varName +".exists(" + indexName + ") LOOP\n";
	var endLoop =  " dbms_output.put_line('------| '||" + indexName + "||' |------'"+ ");\n" 
	   	+" dbms_output.put_line('');\n" 
	 	+ indexName + " := " + varName + ".next(" + indexName + ");"
	 	+ "\nEND LOOP;";          
	 
	 
	var preDbmsOutput = " dbms_output.put_line('";
	var concatenate = " '  || ";
	var postDbmsOutput = " );";
	
	var i;
	var word = "";
	for (i=0; i< str.split(",").length; i++){
		word = str.split(",")[i].trim().split(" ")[0];
		console.log(word);
		if (!(word.trim()===(""))){
			console.log(withLoop);
			if (withLoop === true){
			output= output + preDbmsOutput + word.trim().split(" ")[0].trim() + concatenate 
					+ varName +"(" + indexName + ")" + "."+ word.trim().split(" ")[0].trim()+ postDbmsOutput + "\n";
			} else {
				output= output + preDbmsOutput + word.trim().split(" ")[0].trim() + concatenate 
						+ varName + "."+ word.trim().split(" ")[0].trim()+ postDbmsOutput + "\n";	
			}
		}
	}
	if (withLoop === true){output = startLoop + output+ endLoop;}
	
	
	return output;
}

function generateFromType (input, indexName, varName, withLoop) {
	var output = "";
 
	var str;
	var output= "";

	str= input.replaceAll("SUBTYPE\\s\\S+"," ").replaceAll(" IS "," ").replaceAll("TYPE\\s\\S+"," ");
	str= str.replaceAll(" RECORD","");
	str= str.replaceAll(" TABLE ","").replaceAll("IS RECORD","").replaceAll("TYPE", "");
	str= str.replaceAll("\n", " ").replaceAll("\\(", "").replaceAll("\\)", "").replaceAll(";","");
	str= str.replaceAll("\\s+"," ");
    
	var startLoop = indexName + " := " + varName +".first();\nWHILE "+ varName +".exists(" + indexName + ") LOOP\n";
	var endLoop =  " dbms_output.put_line('------| '||" + indexName + "||' |------'"+ ");\n" 
	   	+" dbms_output.put_line('');\n" 
	 	+ indexName + " := " + varName + ".next(" + indexName + ");"
	 	+ "\nEND LOOP;";          
	 
	 
	var preDbmsOutput = " dbms_output.put_line('";
	var concatenate = " '  || ";
	var postDbmsOutput = " );";
	
	var i;
	var word = "";
	for (i=0; i< str.split(",").length; i++){
		word = str.split(",")[i].trim().split(" ")[0];
		console.log(word);
		if (!(word.trim()===(""))){
			console.log(withLoop);
			if (withLoop === true){
			output= output + preDbmsOutput + word.trim().split(" ")[0].trim() + concatenate 
					+ varName +"(" + indexName + ")" + "."+ word.trim().split(" ")[0].trim()+ postDbmsOutput + "\n";
			} else {
				output= output + preDbmsOutput + word.trim().split(" ")[0].trim() + concatenate 
						+ varName + "."+ word.trim().split(" ")[0].trim()+ postDbmsOutput + "\n";	
			}
		}
	}
	if (withLoop === true){output = startLoop + output+ endLoop;}
	
	
	return output;
}


function generateDbmsOuput (){
	var input = document.getElementById('inputText').value;
	var fromObject = document.getElementById('codeOriginObject').checked;
	var fromType = document.getElementById('codeOriginType').checked; 
	var withLoop = document.getElementById('withLoop').checked; 
	var indexName = document.getElementById('indexName').value; 
	var varName = $("#variableName").val();//document.getElementById('variableName').value; 
    console.log(fromType);
	var output = input + " bla";
 	if (fromObject) {
		output = generateFromObject(input, indexName, varName, withLoop);
	} 
	
	if (fromType){
		output = generateFromType(input, indexName, varName, withLoop);
	}
 	document.getElementById('outputText').innerHTML = output;

}