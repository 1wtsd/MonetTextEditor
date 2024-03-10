var openedFileName = null;

var MTXVersion = '1.1';

function adjustTextareaHeight() {
    var textarea = document.getElementById('textarea');
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

document.addEventListener("DOMContentLoaded", function() {
    var title = document.getElementById("title");
    title.textContent += " v" + MTXVersion;
});

function toggleMenu() {
    var menu = document.getElementById("dropdownMenu");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function toggleMenuEdit() {
    var menu = document.getElementById("dropdownMenuEdit");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function openFile() {
    var input = document.createElement('input');
    var title = document.getElementById("title");
    input.type = 'file';

    input.onchange = function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function() {
            var text = reader.result;
            document.getElementById('textarea').value = text;
            adjustTextareaHeight();
            title.textContent = file.name;
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

function paste() {
    var textarea = document.getElementById('textarea');
    navigator.clipboard.readText()
        .then((clipboardText) => {
            textarea.value += clipboardText;
        })
        .catch((error) => {
            console.error('MTError 20 - Failed to read clipboard contents: ', error);
        });
}

function selectAll() {
    var textarea = document.getElementById('textarea');
    textarea.select();
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
    alert('Monet Text Editor\n\nVersion ' + MTXVersion + '\nCreated by iwtsyd\nGitHub: https://github.com/1wtsd/MonetTextEditor');
}

function toggleTheme() {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');

    if (theme === '0') {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }
}

window.onload = toggleTheme;
