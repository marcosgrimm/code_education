<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 14/01/16
 * Time: 22:38
 */

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\Client;

class ClientTransformer extends TransformerAbstract
{
    public function transform(Client $client)
    {
        return [
            'id' => $client->id,
            'responsible'=>$client->responsible,
            'email'=>$client->email,
            'phone'=>$client->phone,
            'name'=>$client->name,
            'address'=>$client->address,
            'obs'=>$client->obs,
        ];
    }
}