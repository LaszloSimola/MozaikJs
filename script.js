$(function() {
    $("#dateInput").datepicker();

    loadItems();

    $("#createCollectionBtn").click(function() {
        $("#collectionForm").toggle();

    });

    $("#createBtn").click(function() {
        var name = $("#nameInput").val();
        var description = $("#descriptionInput").val();
        var date = $("#dateInput").val();

        if (name === '' || description === '' || date === '') {
            alert("Kérlek, töltsd ki az összes mezőt!");
            return;
        }

        var deleteButton = $("<button>").text("Törlés").addClass("btn btn-danger btn-sm ms-2");
        var renameButton = $("<button>").text("Átnevezés").addClass("btn btn-primary btn-sm ms-2").attr("id", "renameButton");
        var titleElement = $("<span>").addClass("title").text(name);
        var addNewItemButton = $("<button>").text("Új elem hozzáadása").addClass("btn btn-success btn-sm ms-2");
        var collectionItem = $("<li class=\"list-group-item\">").append("<strong>Cím:</strong> ", titleElement, ", <strong>Témakör:</strong> ", description, ", <strong>Dátum:</strong> ", date, deleteButton, renameButton, addNewItemButton);
        $("#addedCollections").append(collectionItem);

        deleteButton.css("margin-left", "10px");

        saveItems();

        deleteButton.click(function() {
            collectionItem.remove();
            saveItems();
        });

        renameButton.click(function() {
            var newTitle = prompt("Add meg az új címet:");
            if (newTitle !== null && newTitle !== "") {
                titleElement.text(newTitle); // Update the text of the title element
                saveItems();
            }
        });

        addNewItemButton.click(function() {
            var newName = prompt("Add meg az új elem címét:");
            if (newName !== null && newName !== "") {
                var newItem = $("<li>").text(newName).addClass("list-group-item");
                collectionItem.append(newItem);
                saveItems();
            }
        });
    });

    function loadItems() {
        var savedItems = localStorage.getItem("savedItems");
        if (savedItems) {
            $("#addedCollections").html(savedItems);
            // Attach event handlers for dynamically created elements
            attachEventHandlers();
        }
    }

    function saveItems() {
        var itemsHtml = $("#addedCollections").html();
        localStorage.setItem("savedItems", itemsHtml);
    }

    // Function to attach event handlers for dynamically created elements
    function attachEventHandlers() {
        // Event handler for delete buttons
        $(".btn-danger").click(function() {
            $(this).parent().remove();
            saveItems();
        });

        // Event handler for rename buttons
        $("#renameButton").click(function() {
            var titleElement = $(this).siblings(".title");
            var newTitle = prompt("Add meg az új címt:");
            if (newTitle !== null && newTitle !== "") {
                titleElement.text(newTitle);
                saveItems();
            }
        });
    }
});
