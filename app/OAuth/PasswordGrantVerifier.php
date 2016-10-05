<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 23/11/15
 * Time: 22:03
 */

namespace CodeProject\OAuth;

use Illuminate\Support\Facades\Auth;


class PasswordGrantVerifier
{
    public function verify($username, $password)
    {
        $credentials = [
            'email'    => $username,
            'password' => $password,
        ];

        if (Auth::once($credentials)) {
            return Auth::user()->id;
        }

        return false;
    }
}