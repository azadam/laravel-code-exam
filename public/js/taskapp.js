$(function() {
    var tasklistContainer = $('ul#todo-list');

    // Capture changes to the completion status and fire off events to sync back
    tasklistContainer.on('change', 'input.toggle', function(evt) {
        var task_completed = $(this).prop('checked') ? '1' : '0';
        var id = $(this).parent().parent().data('id');

        $.ajax({
            url: './api/task/' + id,
            method: 'PUT',
            data: {task_completed: task_completed}
        });
    });

    // Not necessary but trap double clicks and trigger an event deletion just so we can test the api endpoint
    tasklistContainer.on('dblclick', 'li', function(evt) {
        var id = $(this).data('id');
        $(this).slideUp();
        $.ajax({
            url: './api/task/' + id,
            method: 'DELETE'
        });
    });

    // Creating a generic list item object we can use as a primitive template; will clone and populate as needed
    var taskTemplate = $('<li><div class="view"><input class="toggle" type="checkbox" /><label /></div></li>');

    // Helper function to plug a task object's data into a new list item
    function renderTask(task) {
        var taskRow = taskTemplate.clone();
        taskRow.data('id', task.id);
        if (task.task_completed) {
            $('input.toggle', taskRow).prop('checked', true);
        }
        $('label', taskRow).text(task.task_description);
        tasklistContainer.append(taskRow);
    }

    // Detect enter keypresses and create new tasks at that point
    $('input#new-todo').on('keydown', function(evt) {
        if (evt.keyCode == 13) {
            var taskDescription = $(this).val();
            $(this).val('');
            evt.preventDefault();

            $.ajax({
                url: './api/task',
                method: 'POST',
                data: {task_description: taskDescription},
                success: function(task, textStatus, jqXHR) {
                    renderTask(task);
                }
            });
        }
    });

    // On document ready, we'll go grab a full array of existing tasks and populate the page
    $.ajax({
        url: './api/task',
        success: function(tasks, textStatus, jqXHR) {
            for (var i in tasks) {
                renderTask(tasks[i]);
            }
        },
    });
});

