<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 21/11/15
 * Time: 13:26
 */

namespace CodeProject\Repositories;


use CodeProject\Entities\Client;
use CodeProject\Presenters\ClientPresenter;
use Prettus\Repository\Eloquent\BaseRepository;

class ClientRepositoryEloquent extends BaseRepository implements ClientRepository
{
    public function model()
    {
        return Client::class;
    }


    public function presenter()
    {
        return ClientPresenter::class;
    }
}