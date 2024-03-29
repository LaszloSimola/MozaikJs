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
        var addNewItemButton = $("<button>").text("Új elem hozzáadása").addClass("btn btn-success btn-sm ms-2").attr("id", "addNewItemButton");
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
                var newItemOptions = ['Áthelyezés', 'Átnevezés', 'Törlés']; // Example options for the dropdown
                var select = $('<select>').addClass("");
                for (var i = 0; i < newItemOptions.length; i++) {
                    $('<option>').val(newItemOptions[i]).text(newItemOptions[i]).appendTo(select);
                }
                var dropdownDiv = $("<div>").addClass("dropdown").append(select);
                var newItem = $("<li>").addClass("list-group-item").text(newName);
                var buttn = $('<button>').text("do it").addClass("btn btn-info");
                newItem.append(dropdownDiv);
                collectionItem.append(newItem);
                collectionItem.append(buttn);
                saveItems();

                buttn.click(function() {
                    var selectedAction = select.val();
                    if (selectedAction === "Áthelyezés") {
                        // Add code to handle the "Áthelyezés" action here
                    } else if (selectedAction === "Átnevezés") {
                        var newTitle = prompt("Add meg az új címet:");
                        if (newTitle !== null && newTitle !== "") {
                            newItem.text(newTitle); // Update the text of the list item
                            newItem.append(dropdownDiv);
                            collectionItem.append(newItem);
                            collectionItem.append(buttn);
                        }
                    }else if(selectedAction === "Törlés"){
                        newItem.remove();
                        buttn.remove();
                    }
                    return false;
                });
            }
        });
    });


    function loadItems() {
        var savedItems = localStorage.getItem("savedItems");
        if (savedItems) {
            $("#addedCollections").html(savedItems);
            // Reattach event handlers for dynamically created elements
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

    }

    // Create the button and append it to the DOM
    var addButton = $('<button>').text('Add Item').addClass('btn btn-primary').attr('id', 'addButton');
    $('#listContainer').append(addButton);
    addButton.click(function() {
        // Trigger the click event of the addNewItemButton when this button is clicked
        $('#addNewItemButton').trigger('click');
    });
});
