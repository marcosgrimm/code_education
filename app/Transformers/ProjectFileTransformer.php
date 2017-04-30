<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 14/01/16
 * Time: 22:38
 */

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\ProjectNote;

class ProjectFileTransformer extends TransformerAbstract
{
    public function transform(ProjectFile $file)
    {
        return [
            'id' => $file->id,
            'project_id'=>$file->project_id,
            'name'=>$file->name,
            'description'=>$file->description,
            'extension'=> $file->extension
        ];
    }
}