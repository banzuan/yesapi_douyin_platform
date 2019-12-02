<?php
/**
 * 申请发布
 */

if ($_GET['token'] != 'f48f4ac455c8f5e94f220716f3db8582') {
    die('no access');
}

$content = file_get_contents(dirname(__FILE__) . '/../../publish/_publish_detail');

echo str_replace(
    array("\n", "\033[1;32m", "\033[1;35m", "\033[0m", "/home/apps/projects"), 
    array('<br />', '<font color="green">', '<font color="red">', '</font>', '/YESAPI_ROOT'), 
    trim($content)
);

