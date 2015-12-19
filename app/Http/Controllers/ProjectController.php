<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectRepository;
use CodeProject\Services\ProjectService;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ProjectController extends Controller
{
    /**
     * @var ProjectRepository
     */
    private $repository;
    /**
     * @var ProjectService
     */
    private $service;

    public function __construct(ProjectRepository $repository, ProjectService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $owner_id = \Authorizer::getResourceOwnerId();
        return $this->repository->with(['owner','client','notes'])->findWhere(['owner_id'=>$owner_id])->all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        return $this->service->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {

        if ($this->checkProjectPermission($id) == false){
            return ['error'=>'access forbidden'];
        }
        return $this->repository->with(['owner','client'])->find($id);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        if ($this->checkProjectOwner($id) == false){
            return ['error'=>'access forbidden'];
        }

        $this->service->update($request->all(),$id);
        
        return 'Alterado com sucesso!';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {

        if ($this->checkProjectOwner($id) == false){
            return ['error'=>'access forbidden'];
        }
        $this->repository->find($id)->delete();
    }

    private function checkProjectOwner($project_id){
        $owner_id = \Authorizer::getResourceOwnerId();
        return ($this->repository->isOwner($project_id,$owner_id));
    }

    private function checkProjectMember($project_id){
        $member_id = \Authorizer::getResourceOwnerId();
        return ($this->repository->hasMember($project_id,$member_id));
    }

    private function checkProjectPermission ($project_id){
        if ($this->checkProjectOwner($project_id) || $this->checkProjectMember($project_id) ){
            return true;
        }

        return false;
    }
}
