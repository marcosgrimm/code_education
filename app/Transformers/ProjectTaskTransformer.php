<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 14/01/16
 * Time: 22:38
 */

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\ProjectTask;

class ProjectTaskTransformer extends TransformerAbstract
{
    public function transform(ProjectTask $task)
    {
        return [
            'task_id' => $task->id,
            'project_id'=>$task->project_id,
            'start_date'=>$task->start_date,
            'due_date'=>$task->due_date,
            'name'=>$task->name,
            'status'=>$task->status,
        ];
    }
}