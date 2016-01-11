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
use CodeProject\Validators\ProjectValidator;
use Prettus\Validator\Exceptions\ValidatorException;

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

    public function __construct(ProjectRepository $repository, ProjectValidator $validator)
    {

        $this->repository = $repository;
        $this->validator = $validator;
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

}