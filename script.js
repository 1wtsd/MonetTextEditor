var openedFileName = null; 

var MTXVersion = '1.0';

function adjustTextareaHeight() {
    var textarea = document.getElementById('textarea');
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function toggleMenu() {
    var menu = document.getElementById("dropdownMenu");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function openFile() {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        
        reader.onload = function() {
            var text = reader.result;
            document.getElementById('textarea').value = text;
            adjustTextareaHeight();
            openedFileName = file.name;
        };
        
        reader.readAsText(file);
    };

    input.click();
}

function saveFile() {
    var textarea = document.getElementById('textarea');
    var text = textarea.value;
    var fileName = openedFileName || 'document.txt'; 
    var blob = new Blob([text], { type: 'text/plain' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}

window.onclick = function(event) {
    if (!event.target.matches('.menu-item') && !event.target.matches('.dropdown-menu')) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
}

document.getElementById('textarea').addEventListener('input', function() {
    adjustTextareaHeight();
});

function exitEditor() {
    if (confirm("Are you sure you want to exit?")) {
        window.close();
    }
}

function showAbout() {
    alert('Monet Text Editor\nVersion '+ MTXVersion +'\nCreated by iwtsyd (Quirix Soft)');
}
