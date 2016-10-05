<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 14/01/16
 * Time: 22:38
 */

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\User;

class UserTransformer extends TransformerAbstract
{
    public function transform(User $user)
    {
        return [
            'id' => $user->id,
            'email'=>$user->email,
            'name'=>$user->name,
        ];
    }
}