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
    protected $fieldSearchable = [
        'name',
        'email'
    ];
    public function model()
    {
        return Client::class;
    }
    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
    }
    public function presenter()
    {
        return ClientPresenter::class;
    }
}