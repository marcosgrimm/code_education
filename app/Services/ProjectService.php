<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 21/11/15
 * Time: 20:26
 */

namespace CodeProject\Services;


use CodeProject\Entities\ProjectMember;
use CodeProject\Repositories\ProjectMemberRepositoryEloquent;
use CodeProject\Repositories\ProjectRepository;
use CodeProject\Validators\ProjectFileValidator;
use CodeProject\Validators\ProjectValidator;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Contracts\Filesystem\Factory;
use Prettus\Validator\Exceptions\ValidatorException;

use LucaDegasperi\OAuth2Server\Facades\Authorizer;

use CodeProject\Http\Requests\Request as Request;


class ProjectService
{

    /**
     * @var ProjectRepository
     */
    protected $repository;
    /**
     * @var ProjectValidator
     */
    private $validator;
    /**
     * @var Filesystem
     */
    private $filesystem;
    /**
     * @var Factory
     */
    private $factory;
    /**
     * @var ProjectFileValidator
     */
    private $projectFileValidator;


    public function __construct(ProjectRepository $repository, ProjectValidator $validator, Filesystem $filesystem, Factory $factory, ProjectFileValidator $projectFileValidator)
    {

        $this->repository = $repository;
        $this->validator = $validator;

        $this->filesystem = $filesystem;
        $this->factory = $factory;
        $this->projectFileValidator = $projectFileValidator;
    }

    public function create(array $data){
        try
        {
            $this->validator->with($data)->passesOrFail();
            return $this->repository->create($data);
        }catch (ValidatorException $e){
            return [
                'error'=>true,
                'message'=>$e->getMessageBag()
            ];
        }
    }

    public function update(array $data,$id){
        try
        {
            $this->validator->with($data)->passesOrFail();
            return $this->repository->update($data,$id);
        }catch (ValidatorException $e){
            return [
                'error'=>true,
                'message'=>$e->getMessageBag()
            ];
        }

    }

    public function addMember($memberId,$id){
        try
        {
            $data = ['project_id'=>$id, 'member_id'=>$memberId];

            $projectMember =  new ProjectMember();
            $projectMember->create($data);

        }catch (ValidatorException $e){
            return [
                'error'=>true,
                'message'=>$e->getMessageBag()
            ];
        }

        return 'Sucesso';
    }

    public function removeMember($memberId,$id){
        try
        {

            $data = ['project_id'=>$id, 'member_id'=>$memberId];
            $container = new \Illuminate\Container\Container();
            $projectMemberRepository = new ProjectMemberRepositoryEloquent($container);
            $projectMemberRepository->findWhere($data)->pop()->delete();

        }catch (ValidatorException $e){
            return [
                'error'=>true,
                'message'=>$e->getMessageBag()
            ];
        }
        return 'Sucesso';
    }

    public function isOwner($projectId, $userId){

        if (count($this->repository->findWhere(['id'=>$projectId, 'owner_id'=>$userId]))){
            return true;
        }

        return false;
    }

    public function isMember($projectId, $memberId){

        $project = $this->repository->find($projectId);

        foreach ($project->members as $member){
            if ($member->id == $memberId){
                return true;
            }
        }
        return false;
    }

    public function createFile( $request,$projectId){
        // name, description, extension, file
        try
        {
            $this->projectFileValidator->with($request->all())->passesOrFail();

            $file = $request->file('file');
            $data['file']=$file;
            $arFile = explode('.',$file->getClientOriginalName());

            $data['name']=$request->name;
            $data['extension']=$arFile[1];
            $data['project_id']= $request->project_id;
            $data['description']= $request->description;

            $project = $this->repository->skipPresenter()->find($projectId);
            $projectFile = $project->files()->create($data);
            $this->factory->put($projectFile->name.'.'.$data['extension'], $this->filesystem->get($file));
            return $projectFile;
        }catch (ValidatorException $e){

            return [
                'error'=>true,
                'message'=>$e->getMessageBag()
            ];
        }
    }

    public function deleteFile($id,$projectFileRepository){
        try
        {
            if (empty($id)){
                trigger_error('Sem Id');
            }
            $projectFile = $projectFileRepository->skipPresenter()->find($id);
            $this->factory->delete($projectFile->name.'.'.$projectFile->extension);
            $projectFileRepository->skipPresenter()->find($id)->delete();
            return 'Excluido com sucesso';
        }catch (Exception $e){
            return [
                'error'=>true,
                'message'=>'É necessário um ID para fazer a exclusão'
            ];
        }

    }


    public function checkProjectOwner($project_id){

        $owner_id = \Authorizer::getResourceOwnerId();
        return ($this->repository->isOwner($project_id,$owner_id));
    }

    public function checkProjectMember($project_id){
        $member_id = \Authorizer::getResourceOwnerId();
        return ($this->repository->hasMember($project_id,$member_id));
    }

    public function checkProjectPermission ($project_id){
        if ($this->checkProjectOwner($project_id) || $this->checkProjectMember($project_id) ){
            return true;
        }

        return false;
    }
}
