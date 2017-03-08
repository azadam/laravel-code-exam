<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Task;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/task', function () {
    $task = new App\Task();
    $task->task_completed = 0;
    if (Input::has('task_completed')) {
        $task->task_completed = Input::get('task_completed') == '1' ? 1 : 0;
    }
    $task->task_description = Input::get('task_description', '');
    $task->save();
    return response()->json($task);
});

Route::get('/task', function () {
    $tasks = App\Task::all();
    return response()->json($tasks);
});

Route::put('/task/{id}', function ($id) {
    $task = App\Task::findOrFail($id);
    if (Input::has('task_description')) {
        $task->task_description = Input::get('task_description');
    }
    if (Input::has('task_completed')) {
        $task->task_completed = Input::get('task_completed') == '1' ? 1 : 0;
    }
    $task->save();
    return response()->json($task);
});

Route::delete('/task/{id}', function ($id) {
    $task = App\Task::findOrFail($id);
    $task->delete();
    return '';
});
