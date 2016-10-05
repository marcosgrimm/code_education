<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectFileRepository;
use CodeProject\Services\ProjectService;
use Illuminate\Http\Request;

class ProjectFileController extends Controller
{
    /**
     * @var ProjectFileRepository
     */
    private $repository;
    /**
     * @var ProjectService
     */
    private $service;


    public function __construct(ProjectFileRepository $repository , ProjectService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request,$id)
    {
        return $this->service->createFile($request,$id);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($project_id,$id)
    {

        return $this->service->deleteFile($id,$this->repository);

    }

    
}
