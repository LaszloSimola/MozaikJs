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
                alert("Please fill out all fields!");
                return;
            }

            var deleteButton = $("<button>").text("Törlés").addClass("btn btn-danger btn-sm ms-2 deleteButton");
            var renameButton = $("<button>").text("Átnevezés").addClass("btn btn-primary btn-sm ms-2 renameButton");
            var titleElement = $("<span>").addClass("title").text(name);
            var addNewItemButton = $("<button>").text("Új elem hozzáadása").addClass("btn btn-success btn-sm ms-2 addNewItemButton");
            var collectionItem = $("<li class=\"list-group-item\">").append("<strong>Title:</strong> ", titleElement, ", <strong>Description:</strong> ", description, ", <strong>Date:</strong> ", date, deleteButton, renameButton, addNewItemButton);
            $("#addedCollections").append(collectionItem);
            deleteButton.css("margin-left", "10px");
            saveItems();
        });
        //deleteButton button event handler
        $(document).on("click", ".deleteButton", function() {
            $(this).closest('li').remove();
            saveItems();
        });
        //rename button event handler
        $(document).on("click", ".renameButton", function() {
            var titleElement = $(this).siblings('.title');
            var newTitle = prompt("Adj meg egy új címet:");
            if (newTitle !== null && newTitle !== "") {
                titleElement.text(newTitle); // Update the text of the title element
                saveItems();
            }
        });
        //add new item button event handler
        $(document).on("click", ".addNewItemButton", function() {
            var collectionItem = $(this).closest('li');
            var newName = prompt("Új elem neve:");
            if (newName !== null && newName !== "") {
                var newItemOptions = ['Áthelyezés', 'Átnevezés', 'Törlés'];
                var select = $('<select>').addClass('form-control');
                for (var i = 0; i < newItemOptions.length; i++) {
                    $('<option>').val(newItemOptions[i]).text(newItemOptions[i]).appendTo(select);
                }
                var dropdownDiv = $("<div>").addClass("dropdown").append(select);
                var newItem = $("<li>").addClass("list-group-item").text(newName);
                var buttn = $('<button>').text("    Megerősítés").addClass("btn btn-info");
                newItem.append(dropdownDiv);
                collectionItem.append(newItem);
                collectionItem.append(buttn);
                saveItems();

                // event handlers for the dropdown list
                buttn.click(function() {
                    var selectedAction = select.val();
                    var currentIndex = collectionItem.index();
                    if (selectedAction === "Áthelyezés") {
                        var newPosition = prompt("Enter the new position:");
                        if (newPosition !== null && newPosition !== "") {
                            var newIndex = parseInt(newPosition) - 1;
                            var items = $("#addedCollections").children();
                            if (newIndex >= 0 && newIndex < items.length) {
                                var targetItem = items.eq(newIndex);
                                if (!targetItem.is(collectionItem)) {
                                    if (currentIndex < newIndex) {
                                        collectionItem.insertAfter(targetItem);
                                    } else {
                                        collectionItem.insertBefore(targetItem);
                                    }
                                    saveItems();
                                } else {
                                    alert("The item is already in that position.");
                                }
                            } else {
                                alert("Invalid position.");
                            }
                        }
                    } else if (selectedAction === "Átnevezés") {
                        var newTitle = prompt("Adj meg egy új címet:");
                        if (newTitle !== null && newTitle !== "") {
                            newItem.text(newTitle); // Update the text of the list item
                            newItem.append(dropdownDiv);
                            collectionItem.append(newItem);
                            collectionItem.append(buttn);
                            saveItems();
                        }
                    } else if (selectedAction === "Törlés") {
                        newItem.remove();
                        buttn.remove();
                        saveItems();
                    }
                    return false;
                });
            }
        });
        //loading items method
        function loadItems() {
            var savedItems = localStorage.getItem("savedItems");
            if (savedItems) {
                $("#addedCollections").html(savedItems);
            }
        }
        //saving items method
        function saveItems() {
            var itemsHtml = $("#addedCollections").html();
            localStorage.setItem("savedItems", itemsHtml);
        }


    });
