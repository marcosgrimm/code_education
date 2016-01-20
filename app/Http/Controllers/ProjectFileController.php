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
    public function store(Request $request)
    {
        $file = $request->file('file');
        $data['file']=$file;
        $arFile = explode('.',$file->getClientOriginalName());
        $data['name']=$arFile[0];
        $data['extension']=$arFile[1];
        $data['project_id']= $request->project_id;
        $data['description']= $request->description;

        $this->service->createFile($data);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($project_id,$id)
    {

        $this->service->deleteFile($id,$this->repository);

    }

    
}
