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

class ProjectNoteTransformer extends TransformerAbstract
{
    public function transform(ProjectNote $note)
    {
        return [
            'note_id' => $note->id,
            'project_id'=>$note->project_id,
            'title'=>$note->title,
            'note'=>$note->note,
        ];
    }
}