<?php
/**
 * Created by PhpStorm.
 * User: marcosgrimm
 * Date: 14/01/16
 * Time: 22:19
 */

namespace CodeProject\Presenters;

use CodeProject\Transformers\ProjectNoteTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

class ProjectNotePresenter extends FractalPresenter
{

    public function getTransformer(){
        return new ProjectNoteTransformer();
    }
}