

  //your code here
var appviewmodel = function (allnotes) {
    var self = this;
    self.note = ko.observableArray(allnotes);
 
    self.addNote = function() {
		var noteName = $('#noteTitle').text();
		var noteContent = $('#noteDescription').text();
           $.post(
              "/adddoc",
              { noteName: noteName, noteContent : noteContent }
           ).done(function (reply) {
				// self.note = ko.observableArray(reply);
			  	
			  modal.style.display = "none";
           });
        self.note.push({ name: noteName ,content : noteContent });
    };
 self.viewNote = function() {
	 var modal = document.getElementById('myModal');
	 savebtn.style.display='none';
	 $('#noteTitle').text(this.name);
	 $('#noteDescription').text(this.content);
    modal.style.display = "block";
}
 self.removeNote = function() {
	 var noteName = this.name;
           $.post(
              "/deletedoc",
              { noteName: noteName }
           ).done(function (reply) {

        
    });
	self.note.remove(this);
};
}
 function Createmodel(allnotes) {
    ko.applyBindings(new appviewmodel(allnotes));
}
var savebtn = document.getElementById('saveBtn');
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



span.onclick = function() {
    
	var desc = document.getElementById('noteDescription') 
	desc.setAttribute("contenteditable", false);
	 var tit = document.getElementById('noteTitle') 
	 tit.setAttribute("contenteditable", false);
	modal.style.display = "none";
}
$('#add').on("click", function(){ 
	 $('#noteTitle').text("Add Title...");
	 $('#noteDescription').text("Add Content...");
	 savebtn.style.display='';
	var desc = document.getElementById('noteDescription') 
	desc.setAttribute("contenteditable", true);
	var tit = document.getElementById('noteTitle') 
	tit.setAttribute("contenteditable", true);
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
});
$('#editBtn').on("click", function(){ 
	var desc = document.getElementById('noteDescription') 
	desc.setAttribute("contenteditable", true);
	// var tit = document.getElementById('noteTitle') 
	// tit.setAttribute("contenteditable", true);
	savebtn.style.display='';
});
$('#deleteBtn').on("click",function deletedoc () {
	var noteName = $('#noteTitle').text();
           $.post(
              "/deletedoc",
              { noteName: noteName }
           ).done(function (reply) {
            $('ul').empty();
			$('#notesList').append('<li>	<div class = "notes" data-bind="click: $parent.viewNote"> <button id="removenote" class="removebtn" data-bind="click: $parent.removeNote" title="Delete"><i class="fas fa-times"></i></button>       <span class = "noteName" data-bind="text: name"> </span>		<span class = "noteText" data-bind="text: content"> </span>		</div>    </li>')
              Createmodel(reply)
			  modal.style.display = "none";
           });
   });
    
$("#noteTitle").focus(function() {
    if ($(this).text() == "Add Title...") {
        $(this).text("");
    }
}).focusout(function() {
    if (!$(this).text().length) {
        $(this).text("Add Title...");
    }
});
$("#noteDescription").focus(function() {
    if ($(this).text() == "Add Content...") {
        $(this).text("");
    }
}).focusout(function() {
    if (!$(this).text().length) {
        $(this).text("Add Content...");
    }
});
function jsonEscape(str)  {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}
