<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectFileRepository;
use CodeProject\Services\ProjectFileService;
use Illuminate\Http\Request;

class ProjectFileController extends Controller
{
    /**
     * @var ProjectService
     */
    private $projectService;
    /**
     * @var ProjectFileRepository
     */
    private $repository;
    /**
     * @var FileProjectService
     */
    private $service;




    public function __construct(ProjectFileRepository $repository , ProjectFileService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @param $id
     * @return Response
     */
    public function index($id)
    {
        return $this->repository->findWhere(['project_id' => $id]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request,$id)
    {
//        return $this->service->createFile($request,$id);
        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();

        $data['file'] = $file;
        $data['extension'] = $extension;
        $data['name'] = $request->name;
        $data['project_id'] = $request->project_id;
        $data['description'] = $request->description;

        return $this->service->create($data);

    }

    public function showFile($project_id, $id)
    {
//        if ($this->projectService->checkProjectPermissions($project_id) == false) {
//            return ['error' => 'Access Forbidden'];
//        }
        $filePath = $this->service->getFilePath($id);
        $fileContent = file_get_contents($filePath);
        $fileContent64 = base64_encode($fileContent);
        return [
            'file'=>$fileContent64,
            'size'=> filesize($filePath),
            'name'=> $this->service->getFileName($id)
        ];

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @param $idFile
     * @return Response
     */
    public function show($id, $idFile)
    {
       // if($this->projectService->checkProjectPermissions($id) == false){
         //   return ['error' => 'Access Forbidden'];
        //}

        return $this->repository->find($idFile);
     }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($project_id,$idFile)
    {
       /* if($this->projectService->checkProjectPermissions($project_id) == false){
            return ['error' => 'Access Forbidden'];
        }*/
        $this->service->delete($idFile);

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  Request $request
     * @param  int $id
     * @return Response
     */
    public function update(Request $request, $project_id)
    {
//        if ($this->projectService->checkProjectPermissions($project_id) == false) {
//            return ['error' => 'Access Forbidden'];
//        }
        return $this->service->update($request->all(), $project_id);
    }
}
