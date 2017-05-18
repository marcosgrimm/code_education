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
        $this->middleware('check-project-owner', ['except' => ['index','store', 'show']]);
        $this->middleware('check-project-permission', ['except' => ['index','store', 'update', 'destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $owner_id = \Authorizer::getResourceOwnerId();
//dd(123);
        return $this->repository->with(['owner','client','notes'])->findWhere(['owner_id'=>$owner_id]);
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
        return $this->repository->find($id);

        //dd($id);
//        return $this->repository->with(['owner','client','notes'])->find($id);

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
        if ($this->service->checkProjectOwner($id) == false){
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

        if ($this->service->checkProjectOwner($id) == false){
            return ['error'=>'access forbidden'];
        }

        $this->repository->delete($id);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function showMembers($id)
    {

        if ($this->service->checkProjectPermission($id) == false){
            return ['error'=>'access forbidden'];
        }

        $data = ['project_id'=>$id];
        $container = new \Illuminate\Container\Container();
        $projectMemberRepository = new \CodeProject\Repositories\ProjectMemberRepositoryEloquent($container);
        return $projectMemberRepository->skipPresenter()->findWhere($data);


    }


}
