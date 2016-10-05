<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 21/11/15
 * Time: 20:45
 */

namespace CodeProject\Validators;


use Prettus\Validator\LaravelValidator;

class ProjectTaskValidator extends LaravelValidator
{
    protected $rules = [
        'project_id' => 'required|integer',
        'name' => 'required',
        'status' => 'required|integer',
        'start_date' => 'required',
        'due_date' => 'required',
    ];
}