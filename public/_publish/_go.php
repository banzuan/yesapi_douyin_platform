<?php
/**
 * 申请发布
 */

if ($_GET['token'] != 'f48f4ac455c8f5e94f220716f3db8582') {
    die('no access');
}

$rs = file_put_contents(dirname(__FILE__) . '/../../publish/_publish_what', 'lite');

die($rs ? 'ok' : 'fail');
