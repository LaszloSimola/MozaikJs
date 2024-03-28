$(function() {

    $("#dateInput").datepicker();

    $("#createCollectionBtn").click(function() {
        $("#collectionForm").toggle();
    });

    $("#createBtn").click(function() {

        var name = $("#nameInput").val();
        var description = $("#descriptionInput").val();
        var date = $("#dateInput").val();


    });
});
