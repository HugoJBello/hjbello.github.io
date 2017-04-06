
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function generateFromObject (input, indexName, varName, withLoop) {
	var output = input + " blaObject";
 
	var str;
	var output= "--";

	str = input.split("CONSTRUCTOR FUNCTION")[0];
	str= str.replaceAll("CREATE OR REPLACE.+","");
	str= str.replaceAll("\n", " ").replaceAll("\\(", "").replaceAll("\\)", "").replaceAll(";","");
	str= str.replaceAll("\\s+"," ");
	var startLoop = indexName + " := " + variableName +".first();\nWHILE "+ variableName +".exists(" + indexName + ") LOOP\n";
	var endLoop =  " dbms_output.put_line('------| '||" + indexName + "||' |------'"+ ");\n" 
	   	+" dbms_output.put_line('');\n" 
	 	+ indexName + " := " + variableName + ".next(" + indexName + ");"
	 	+ "\nEND LOOP;";          
	 
	 
	var preDbmsOutput = " dbms_output.put_line('";
	var concatenate = " '  || ";
	var postDbmsOutput = " );";
	
	var i;
	var word = "";
	for (i=0; i< str.split(",").length; i++){
		word = str.split(",")[i].trim().split(" ")[0];
		console.log("´´´´´´")
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
	
	
	
	return output;
}

function generateFromType (input) {
	var output = input + " blaType";
	return output;
}


function generateDbmsOuput (){
	var input = document.getElementById('inputText').value;
	var fromObject = document.getElementById('codeOriginObject').checked;
	var fromType = document.getElementById('codeOriginType').checked; 
	var withLoop = document.getElementById('withLoop').checked; 
	var indexName = document.getElementById('indexName').value; 
	var varName = document.getElementById('variableName').value; 

	var output = input + " bla";
 	if (fromObject) {
		output = generateFromObject(input, indexName, varName, withLoop);
	} 
	
	if (fromType){
		output = generateFromType(input);
	}
 	document.getElementById('outputText').innerHTML = output;

}