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


class ProjectTransformer extends  TransformerAbstract
{

    protected $defaultIncludes = ['members','tasks','notes','client','files'];

    public function transform(Project $project){
        return [
            'project_id' => $project->id,
            'owner_id'=>$project->owner_id,
            'client_id'=>$project->client_id,
            'name'=> $project->name,
            'description'=>$project->description,
            'progress'=> (int) $project->progress,
            'status'=>$project->status,
            'due_date'=>$project->due_date,
            'is_member'=>  $project->owner_id != \Authorizer::getResourceOwnerId(),
            'tasks_count' => $project->tasks->count(),
            'tasks_opened' => $this->countTasksOpened($project)
        ];

    }

    public function includeClient(Project $project)
    {
        if ($project->client) {
            return $this->item($project->client, new ClientTransformer());
        }
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

    public function includeFiles(Project $project)
    {
        return $this->collection($project->files, new ProjectFileTransformer());
    }

    public function includeNotes(Project $project){
        if ($project->notes){
            return $this->collection($project->notes, new ProjectNoteTransformer());
        }
    }

    private function countTasksOpened(Project $project)
    {
        $count = 0;
        foreach ($project->tasks as $task) {
            if ($task->status == 1)
                $count++;
        }
        return $count;
    }

}