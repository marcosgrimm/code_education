<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 21/11/15
 * Time: 20:45
 */

namespace CodeProject\Validators;


use Prettus\Validator\LaravelValidator;

class ClientValidator extends LaravelValidator
{
    protected $rules = [
        'name' => 'required|max:255',
        'responsible' => 'required|max:255',
        'email' => 'required|email',
        'phone' => 'required',
        'address' => 'required',
    ];
}