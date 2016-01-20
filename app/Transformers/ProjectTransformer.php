<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 14/01/16
 * Time: 22:08
 */

namespace CodeProject\Transformers;
use CodeProject\Entities\Project;
use League\Fractal\TransformerAbstract;
use CodeProject\Transformers\ProjectMemberTransformer;
use CodeProject\Transformers\ProjectTaskTransformer;
use CodeProject\Transformers\ProjectNotesTransformer;

class ProjectTransformer extends  TransformerAbstract
{

    protected $defaultIncludes = ['members','tasks','notes'];

    public function transform(Project $project){
        return [
            'project_id' => $project->id,
            'owner_id'=>$project->owner_id,
            'client_id'=>$project->client_id,
            'name'=> $project->name,
            'description'=>$project->description,
            'progress'=>$project->progress,
            'status'=>$project->status,
            'due_date'=>$project->due_date

        ];

    }

    public function includeMembers(Project $project){
        if ($project->members){
            return $this->collection($project->members, new ProjectMemberTransformer());
        }
    }

    public function includeTasks(Project $project){
        if ($project->tasks){
            return $this->collection($project->tasks, new ProjectTaskTransformer());
        }
    }

    public function includeNotes(Project $project){
        if ($project->notes){
            return $this->collection($project->notes, new ProjectNoteTransformer());
        }
    }


}