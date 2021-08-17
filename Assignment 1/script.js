const diaryEntry = document.querySelector(".diary-entry");
const saveButton = document.getElementById("save");
const words = document.getElementById("words");
const openDiary = document.getElementById("list");

let diary = [];

diaryEntry.addEventListener("submit", function (event) {
  event.preventDefault();
  if (words.value.length != 0) {
    var item = words.value;
    if (item != "") {
      const entry = {
        id: Date.now(),
        content: item,
        completed: true,
      };

      diary.push(entry); //Adding entry to the diary array
      saveToLocalStorage(diary);

      words.value = "";
    }

    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    sessionStorage.setItem("lastLog", time);
    document.getElementById("lastup").innerHTML =
      ": " + sessionStorage.getItem("lastLog");
  }
});

//function to display diary entries
function displayEntries(diary) {
  openDiary.innerHTML = "";
  diary.forEach(function (item) {
    const li = document.createElement("div");
    li.setAttribute("class", "diary-entry-view");
    li.setAttribute("data-key", item.id);
    var dt = document.createElement("div");
    dt.setAttribute("class", "session");
    dt.innerHTML = item.id;
    li.appendChild(dt);
    li.innerHTML =
      item.content + '<button class="delete-button">Delete Entry</button>';
    openDiary.append(li);
  });
}

//function to add diary entries to local storage
function saveToLocalStorage(diary) {
  localStorage.setItem("diary", JSON.stringify(diary));
  displayEntries(diary);
}

//function to retrieve diary entries from local storage
(function () {
  const reference = localStorage.getItem("diary");

  if (reference) {
    diary = JSON.parse(reference);
    displayEntries(diary);
  }
})();

//function to delete an entry
function deleteEntry(id) {
  diary = diary.filter(function (item) {
    return item.id != id;
  });
  //update local storage
  saveToLocalStorage(diary);
}

openDiary.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    deleteEntry(event.target.parentElement.getAttribute("data-key"));
  }
});

//function for erasing text area
function eraseText() {
  document.getElementById("words").value = "";
}
